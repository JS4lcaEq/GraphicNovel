function lib(){

    const history = []
    const getScene = (data, scene, button) => {
        if (button !== undefined) {
            history.push("b"+button);
        }
        history.push("s"+scene);
        const found = data.find((item) => item.id === scene);
        return found;
    }; 
    
    const getHistory = () => {
        return history.join('');
    }

    return {getScene, getHistory}; 
}
