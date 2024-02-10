const config = {
    logger: {
        console: {
            level: "silly"
        },
        files: [
            {
                level: "debug",
                path: "./logs/",
                name: "debug.log"
            },
            {
                level: "warn",
                path: "./logs/",
                name: "error.log"
            }
        ]
    },

    message: {
        entityCreate: {
            msg: "Entity has been added successfully",
            status: true
        },
        entityUpdate: {
            msg: "Entity has been updated successfully",
            status: true
        },
        entityDelete: {
            msg: "Entity has been Deleted successfully",
            status: true
        },
        entityActive: {
            msg: "Entity has been Activated successfully",
            status: true
        },
        imageUpdate: {
            msg: "Image Updated successfully",
            status: true
        },
        fileUpdate: {
            msg: "File Updated successfully",
            status: true
        },
        badAuth: {
            "msg": "Email or password is invalid",
            "status": false
        },
        notAuth: {
            msg: "You no such to be here ;)",
            status: false
        },
        badCredentials: {
            msg: "You shouldn't be here >:(",
            status: false
        },
        paramsError: {
            msg: "Params Error",
            status: false
        },
        dataBase: {
            "msg": "Database Error Contact your Admin",
            "status": false
        },
        entityExists: {
            "msg": "Entity already exists",
            "status": false
        },
        entityNoExists: {
            "msg": "Entity do not exists",
            "status": false
        }
    },
    routes: {
        users: "users",
        roles: "roles",
        customers: "customers",
        timeLine: "timeLine",
        transportType: "transport-type"
    },
    permissionList: [
        "users",
        "roles",
        "customers",
        "transport-type"
    ],
    timeLineTarget: [
        "User",
        "Customer",
        "Role",
        "TransportType"
    ],
    timeLineTargets: {
        user: "User",
        customer: "Customer",
        role: "Role",
        transportType: "TransportType"
    },
    timeLineActionType: {
        create: "CREATE",
        update: "UPDATE",
        remove: "DELETE",
        active: "ACTIVE"
    },
    permissionType: {
        createPermissions: "createPermissions",
        updatePermissions: "updatePermissions",
        deletePermissions: "deletePermissions",
        readPermissions: "readPermissions"
    }
}

export default config