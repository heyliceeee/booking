//ficheiro de configuração da BD

const config = {
    db: 'mongodb://localhost/rooms-test',
    secret:"supersecret",
    expiresPassword: 86400,
    saltRounds: 10
}

module.exports = config;