const taskConstructor = (id, title, description, categoriesStr, status, taskgroup) => {
    const categories = categoriesStr.split(',');
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