const fs = require('fs');

module.exports = class PeopleService {
    constructor() {
        this.peoples = JSON.parse(fs.readFileSync(__dirname + '/people.json', 'utf8'));
    }

    async updatePeople(id, people) {
        const result = this.peoples.filter(people => parseInt(people.id) === parseInt(id));
        if (result === 'undefined' || result.length === 0) {
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
        const result = this.peoples.filter((people) => people.gender === filters.gender);

        return result;
    }

    isEmpty(obj) {
        if (obj == null) return true;
        if (obj.length > 0)    return false;
        if (obj.length === 0)  return true;
        if (typeof obj !== "object") return true;
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }
};
