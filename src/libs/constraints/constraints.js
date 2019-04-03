export class Constraint {
    constructor(id) {
        this.id = id;
        this.name = "<leer>";
        this.leftOperand = "";
        this.rightOperandList = [];
        this.rightOperandNumber = 0;
        this.rightOperandStr = "";
        this.operator = "";
        this.unit = "";
        this.type = "";
    }
}

export let operands = [
    { id: 0, name: "Bundesland" },
    { id: 1, name: "Gruppenzugehörigkeit" },
    { id: 2, name: "Alter" },
    { id: 3, name: "Nutzungsdauer" },
    { id: 4, name: "Nutzeranzahl" }
];

export let operators = [
    { id: 0, symbol: "=", short: "eq" },
    { id: 1, symbol: "<", short: "lt" },
    { id: 2, symbol: "≤", short: "lteq" },
    { id: 3, symbol: ">", short: "gt" },
    { id: 4, symbol: "≥", short: "gteq" }
];

export let states = [
    { id: 0, name: "Baden-Württemberg" },
    { id: 1, name: "Bayern" },
    { id: 2, name: "Berlin" },
    { id: 3, name: "Brandenburg" },
    { id: 4, name: "Bremen" },
    { id: 5, name: "Hamburg" },
    { id: 6, name: "Hessen" },
    { id: 7, name: "Mecklenburg-Vorpommern" },
    { id: 8, name: "Niedersachsen" },
    { id: 9, name: "Nordrhein-Westfalen" },
    { id: 10, name: "Rheinland-Pfalz" },
    { id: 11, name: "Saarland" },
    { id: 12, name: "Sachsen" },
    { id: 13, name: "Sachsen-Anhalt" },
    { id: 14, name: "Schleswig-Holstein" },
    { id: 15, name: "Thüringen" }
];

export let groups = [
    { id: 0, name: "Lehrer" },
    { id: 1, name: "Schüler" },
    { id: 2, name: "Verwaltung" }
];

export let units = [
    { id: 0, name: "Jahre" },
    { id: 1, name: "Tage" },
    { id: 2, name: "Stunden" },
    { id: 3, name: "Nutzer" }
];

export let operandMapping = [
    {
        id: 0, // Bundesland
        operand: operands[0],
        operators: [operators[0]],
        list: states,
        units: []
    },
    {
        id: 1, // Gruppenzugehörigkeit
        operand: operands[1],
        operators: [operators[0]],
        list: groups,
        units: []
    },
    {
        id: 2, // Alter
        operand: operands[2],
        operators: [operators[0], operators[1], operators[2], operators[3], operators[4]],
        list: [],
        units: [units[0], units[1], units[2]]
    },
    {
        id: 3, // Nutzungsdauer
        operand: operands[3],
        operators: [operators[0], operators[1], operators[2], operators[3], operators[4]],
        list: [],
        units: [units[0], units[1], units[2]]
    },
    {
        id: 4, // Nutzeranzahl
        operand: operands[4],
        operators: [operators[0], operators[1], operators[2], operators[3], operators[4]],
        list: [],
        units: [units[3]]
    }
];