export const menu = () => {
    const restaurant = 'tanuki';

    const renderItems = (data) => {
        data.forEach(item => {
            console.log(item);
        });
    }

    fetch(`./db/${restaurant}.json`)
        .then(response => response.json())
        .then(data => renderItems(data))
        .catch(error => console.log(error))
}