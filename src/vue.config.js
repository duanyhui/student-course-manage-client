module.exports = {
    devServer: {
        proxy: axios.defaults.baseURL // 配置访问的服务器地址
    }
}