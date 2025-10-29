export default {
  locale: "ru",
  fallbackLocale: "en",
  messages: {
    en: {
      message: {
        h1: "Graphic Novel",
        menu: {
          home: "Home",
          editor: "Editor",
          files: "Files",
          viewer: "Viewer",
          about: "Instructions",
        },
        editor: {
          buttons: {
            title: "Scene Buttons",
            subject: "text / go to scene / display condition",
            add: "Add Button",
            del: "Delete Button",
          },
          title: "Scene Editor",
          addScene: "Add Scene",
          delScene: "Delete Scene",
          text: "Scene Text",
          bg: "Scene Background",
          style: "Scene Style Class",
          save: "Save Changes",
          load: "Load",
          clear: "Clear",
        },
        about: {
          title: "Instructions for Using the Graphic Novel Editor",
          content: `
<p>This tool is designed for creating simple graphic novels.</p>
<p>Novels consist of scenes, each with a background, text, and buttons for transitioning to other scenes.</p>
<h3>Creating a Novel</h3>
<ol>
<li>Go to the "Editor" tab.</li>
<li>Add a new scene using the "Add Scene" button.</li>
<li>Fill in the scene fields: background (image file name from the img folder), scene text, and transition buttons.</li>
<li>Scenes and buttons are numbered automatically.</li>
<li>Save your changes.</li>
</ol>
<h3>Viewing a Novel</h3>
<ol>
<li>Go to the "View" tab.</li>
<li>Use the on-screen buttons to navigate between scenes.</li>
</ol>
<h3>Saving and Loading</h3>
<p>Novels are automatically saved to your browser's local storage. To export or import a novel, use the editor's export/import functions.</p>
<h3>Image Requirements</h3>
<p>All images must be located in the "img" folder within the project's root directory. Ensure file names are specified correctly when creating scenes.</p> 
          `,
        },
        files: {
          buttons: {
            upload: "Upload novel from JSON file",
            load: "Load novel to JSON file",
          }
        },
      }
    },
    ru: {
      message: {
        h1: "Графическая Новелла",
        menu: {
          home: "Главная",
          editor: "Редактор",
          files: "Файлы",
          viewer: "Просмотр",
          about: "Инструкции",
        },
        editor: {
          buttons: {
            title: "Кнопки Сцены",
            subject: "текст / переход к сцене / условие отображения",
            add: "Добавить",
            del: "Удалить",
          },
          title: "Редактор cцены",
          addScene: "Добавить сцену",
          delScene: "Удалить сцену",
          text: "Текст сцены",
          bg: "Фон сцены",
          style: "Класс стиля сцены",
          save: "Сохранить изменения",
          load: "Загрузить",
          clear: "Очистить",
        },
        about: {
          title: "Инструкции по использованию редактора графической новеллы",
          content: `
<p>Инструмент предназначен для создания простых графических новелл.</p>
<p>Новеллы состоят из сцен, каждая сцена имеет фон, текст и кнопки для перехода к другим сценам.</p>
<h3>Создание новеллы</h3>
<ol>
      <li>Перейдите на вкладку "Редактор".</li>
      <li>Добавьте новую сцену с помощью кнопки "Добавить сцену".</li>
      <li>Заполните поля сцены: фон (имя файла изображения из папки img), текст сцены и кнопки перехода.</li>
      <li>Сцены и кнопки нумеруются автоматически.</li>
      <li>Сохраните изменения.</li>
</ol>
<h3>Просмотр новеллы</h3>
<ol>
      <li>Перейдите на вкладку "Просмотр".</li>
      <li>Используйте кнопки на экране для навигации между сценами.</li>
</ol>
<h3>Сохранение и загрузка</h3>
    <p>Новеллы автоматически сохраняются в локальном хранилище браузера. Для экспорта или импорта новеллы используйте функции экспорта/импорта в редакторе.</p>
    <h3>Требования к изображениям</h3>
    <p>Все изображения должны находиться в папке "img" внутри корневой директории проекта. Убедитесь, что имена файлов указаны правильно при создании сцен.</p> 
          `,
        },
        files: {
          buttons: {
            upload: "Загрузить новеллу из JSON файла на компьютере",
            load: "Выгрузить новеллу в JSON файл на компьютере",
          }
        },
      }
    }
  }
};
