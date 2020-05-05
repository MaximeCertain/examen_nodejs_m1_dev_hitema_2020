const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    async updatePeople(id, people) {
        const result = this.peoples.filter(people => parseInt(people.id) === parseInt(id));
        let nullValue = 0;
        if (result === 'undefined' || result.length === nullValue) {
            return false;
        }
        result[0].name = people.name;
        //écrase le fichier avec nouvelle valeur
        await fs.writeFileSync(__dirname + '/people.json', JSON.stringify(this.peoples), "utf8")
        return true;
    }

    copy(fileName, encoding) {
        const fileContent = fs.readFile(fileName, encoding);
        fs.writeFile('./out/' + fileName, fileContent, encoding)
    }


    getPeople(filters) {
        if(this.isEmpty(filters)){
            return this.peoples;
        }

        const result =  this.peoples.filter(people => {
            return Object.keys(filters).every(key => {
                return people[key] === filters[key];
            });
        });
        return result;
    }

    isEmpty(obj) {
        let nullValue = 0;
        if (obj === null) return true;
        if (obj.length > nullValue)    return false;
        if (obj.length === nullValue)  return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
};
