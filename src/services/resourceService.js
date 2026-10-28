function criarServico(repository, { required = [], ownerFild = null, sanitize = (value) => value } = {}) {
    return {
        async listar(user) {
            const items = await repository.findAll();
            return ownerFild && user.role !== 'admin' 
            ? items.filter((item) => item[ownerFild] === user.id) 
            : items; 
        }
    }
};

export default criarServico;