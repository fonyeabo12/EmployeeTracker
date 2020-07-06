const inquirer = require("inquirer");
const cTable = require("console.table");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'password',
    database: 'employee_Trackerdb'
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

const runSearch = () => {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
           choices: [
                'View all employees',
                'View all employees by Department',
                'View all employees by Manager',
                'Add Employee',
                'Remove Employee',
                'Update Employee Role',
                'Update Employee Manager',
                'exit'
            ],
        }).then(answer => {
            switch (answer.action) {
                 case 'View all employees':
                    employeeSearch();
                    break;

                case 'View all employees by Department':
                    employeeByDepartmentSearch();
                    break;

                case 'View all employees by Manager':
                    employeeByManagerSearch();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateEmployee();
                    break;

                case 'Update Employee Manager':
                    updateEmployeeManager();
                    break;

                case 'exit':
                    connection.end();
                    break;
                default:
                    break;
            }
        })
};


function employeeSearch() {
    console.log('Selecting all employees...\n'); 
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        res.forEach(r => {
            console.table([
                {
                    id: r.id,
                    first_name: r.first_name,
                    last_name: r.last_name,
                    role_id: r.role_id,
                    manager_id: r.manager_id
                },
            ]);
            runSearch();
        });
    });
};



function employeeByDepartmentSearch() {
    console.log('Selecting all employees by Department...\n'); 
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        res.forEach(r => {
            console.table([
                {
                    id: r.id,
                    first_name: r.first_name,
                    last_name: r.last_name,
                    role_id: r.role_id,
                    manager_id: r.manager_id
                },
            ]);
            runSearch();
        });
    });
};


function employeeByManagerSearch() {
    console.log('Selecting all employees Managers...\n'); 
    connection.query('SELECT * FROM manager', function (err, res) {
        if (err) throw err;
        res.forEach(r => {
            console.table([
                {
                    id: r.id,
                    name: r.name,
                    
                },
            ]);
            runSearch();
        });
    });
};



function addEmployee() {
    console.log('Adding an Employee...\n'); 
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        const roles = []
        res.forEach(r => {
            roles.push(`${r.id} ${r.title} `)
        });

        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "last name"

            },
            {
                name: "roles",
                type: "List",
                choices: roles
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter role ID"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter manager ID"
            }
        ]).then(answer => {

            const { first_name, last_name, role_id, manager_id } = answer;

            const query = "INSERT INTO employee (`first_name`,`last_name`, `role_id`, `manager_id`) VALUES (?, ?, ?, ?);"
            connection.query(query, [first_name, last_name, role_id, manager_id], (err, res) => {
                if (err) throw err;
                console.log("Employee details added")
                runSearch();
            })
        });
    })

};
    

   
function removeEmployee() {
    console.log('Removing an Employee...\n'); 
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        const employee = []
        res.forEach(r => {
            employee.push(`${r.id} ${r.first_name} ${r.last_name}`)
        });

        inquirer.prompt([
            {
                name: "Removal",
                message: "Which employee woud you like to remove?",
                choices: employee
            },
            {
                name: "id",
                type: "input",
                message: "Enter I.D"

            },
            {
                name: "roles",
                type: "List",
                choices: roles
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter role ID"
            },
        ]).then(answer => {
            const query = "DELETE FROM employee WHERE I.D=?;"
            connection.query(query, [answer.id], (err, res) => {
                if (err) throw err;
                console.log("Employee details deleted")
                runSearch();
            })
        });
    });

};

function updateEmployee() {
    console.log('Updating an Employee...\n'); 
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        const roles = []
        res.forEach(r => {
            employee.push(`${r.id} ${r.first_name} ${r.last_name}`)
        });
    });

    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        const roles = []
        res.forEach(r => {
            role.push(`${r.id} ${r.title} ${r.salary}`)
        });

        inquirer.prompt([
            {
                name: "Update",
                message: "Which employee will you be updating?",
                choices: employees
            },
            {
                name: "employeeI.D",
                type: "input",
                message: "What is their I.D?"

            },
            {
                name: "roles",
                type: "List",
                message: "Choose their new role",
                choices: roles
                
            },
            {
                name: "role_id",
                type: "input",
                message: "Enter role ID"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Enter manager ID"
            }
        ]).then(answer => {
            connection.query(updateQuery, [first_name, last_name, role_id], (err, res) => {
                if (err) throw err;
                console.log("Updated Employee details")
                runSearch();
            })
        });
    });
};



