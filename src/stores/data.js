import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDataStore = defineStore("data", () => {
  const data = ref([
    { id: 1, text: "Start Scene", buttons: [{ id: 1,text: "Next", go: 2 }] },
    { id: 2, text: "Middle Scene", buttons: [{id: 2, text: "Back", go: 1 }, { id: 3, text: "next", go: 3 }] },
    { id: 3, text: "End Scene", buttons: [{ id: 4, text: "Back", go: 1 }] }
  ]);
  const selectedNodeId = ref(null);

  const selectedNode = computed (() => {
    return get(selectedNodeId.value );
  });

  const save = () => {
    localStorage.setItem("data", JSON.stringify(data.value));
  };

  const load = () => {
    const savedData = localStorage.getItem("data");
    if (savedData) {
      // console.log("data.js:load savedData=", savedData);
      data.value = JSON.parse(savedData);
    }
  };

  const set = (newData) => {
    data.value = JSON.parse(newData);
  }

  const add = () => {
    const newId = data.value.length > 0 ? Math.max(...data.value.map(item => item.id)) + 1 : 1;
    const newElement = { id: newId, text: "New Scene", buttons: [], bg: null };
    data.value.push(newElement);
    return newElement;
  }
  
  const addButton = (pageId) => {
    const page = data.value.find(item => item.id === pageId);
    if (page) {
      const newId = buttons.value.length > 0 ? Math.max(...buttons.value.map(button => button.id? button.id : 0)) + 1 : 1;
      const newButton = { id: newId, text: "New Button ", go: null, ifRegExp: null };
      // console.log("data.js:addButton newButton=", newButton)
      page.buttons.push(newButton);
      return newButton;
    }
    return null;
  }


  const del = (id) => {
    const index = data.value.findIndex(item => item.id === id);
    if (index !== -1) {
      data.value.splice(index, 1);
      return true;
    }
    return false;
  }


  const pages = computed(() => {
    return data.value.map((page) => {
      return { id: page.id, text: page.text, bg: page.bg, className: page.className  };
    });
  });

  const buttons = computed(() => {
    const ret = [];
    data.value.forEach((page) => {
      page.buttons.forEach((button) => {
        ret.push({
          id: button.id,
          text: button.text,
          go: button.go,
          from: page.id,
          ifRegExp: button.ifRegExp
        });
      });
    });
    return ret;
  });

  const get = (id) => {
    const found = data.value.find((item) => item.id === id);
    const bttns = found ? found.buttons.map((button) => {
      return { id: button.id, text: button.text, go: button.go, ifRegExp: button.ifRegExp};
    })  : []  ;
    return found ? {id: found.id, text: found.text, bg: found.bg, className: found.className, buttons: bttns} : null;
  };

  const mermaid = computed(() => {
    let result = "graph TD\n";
    pages.value.forEach((page) => {
      result += `    p${page.id}["${page.id}:${page.text}"]\n`;
    });
    buttons.value.forEach((button) => {
      result += `    p${button.from} -->|${button.id}:${button.text}${button.ifRegExp ? ":"+button.ifRegExp : ""}| p${button.go}\n`;
    });
    return result;
  });

  const updateSingleElement = (newElement) => {
    // console.log("data.js:updateSingleElement newElement=", newElement);
    const index = data.value.findIndex(item => item.id === newElement.id);
    if (index !== -1) {
      data.value[index] = { ...newElement };
      return true;
    }
    return false;
  };

  
  /**
   * Checks if any button in the graph points to the specified page ID
   * Used to verify if a page has any incoming connections before deletion
   * @param {number} id - The page ID to check for incoming connections
   * @returns {boolean} True if page has incoming connections, false otherwise
   * @example
   * // Returns true if any button points to page 2
   * isExistsInputButtonGo(2)
   */
  const isExistsInputButtonGo = (id) => {
    return buttons.value.some(button => button.go == id);
  }


  return { data, pages, buttons, mermaid, selectedNodeId, selectedNode , save, load, get, set, add, addButton, del, isExistsInputButtonGo, updateSingleElement};
});
