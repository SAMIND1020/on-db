require("dotenv").config();

const buildResponse = require("./helpers/buildresponse");
const { Server } = require("./models");

console.clear();

const server = new Server();

server.init();

/*
const data = {
    id: 1,
    name: "jovenes",
    description: "A group for young people",
    type: "community",
    members: [
        {
            id: 101,
            name: "pedrito",
            age: 25,
            email: "pedrito@example.com",
            PersonsGroup: {
                id: 10,
                role: "member",
                joinDate: "2022-01-01"
            }
        },
        {
            id: 102,
            name: "juanita",
            age: 28,
            email: "juanita@example.com",
            PersonsGroup: {
                id: 11,
                role: "admin",
                joinDate: "2021-05-15"
            }
        }
    ]
};

const options = {
    dataName: "group",
    renamedFields: {
        name: "groupName",
        description: "groupDescription"
    },
    excludedFields: [
        "type",
        "members.PersonsGroup" // Excluding the entire PersonsGroup object in each member
    ],
    msg: "Successfully fetched the data"
};

const response = buildResponse(data, options);

console.log("-------------------------------------------------------------------------------------\n",response);

console.log(response.group.members)*/