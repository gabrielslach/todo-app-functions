const taskConstructor = (id, title, description, categoriesStr, status, taskgroup) => {
    const categories = categoriesStr.split(',').map(item=>item.trim());
    return ({
        id,
        title,
        description,
        categories,
        status,
        taskgroup
    })
};

module.exports = taskConstructor;