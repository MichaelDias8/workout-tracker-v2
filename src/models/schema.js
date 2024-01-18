export const schema = {
    "models": {
        "OrderedProgramList": {
            "name": "OrderedProgramList",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "programOrder": {
                    "name": "programOrder",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "programs": {
                    "name": "programs",
                    "isArray": true,
                    "type": {
                        "model": "Program"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "orderedProgramListProgramsId"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "OrderedProgramLists",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Program": {
            "name": "Program",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "orderedProgramListID": {
                    "name": "orderedProgramListID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "trainingSessionOrder": {
                    "name": "trainingSessionOrder",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "trainingSessions": {
                    "name": "trainingSessions",
                    "isArray": true,
                    "type": {
                        "model": "TrainingSession"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "programTrainingSessionsId",
                            "programTrainingSessionsOrderedProgramListID"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "orderedProgramListProgramsId": {
                    "name": "orderedProgramListProgramsId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Programs",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "id",
                            "orderedProgramListID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "gsi-OrderedProgramList.programs",
                        "fields": [
                            "orderedProgramListProgramsId"
                        ]
                    }
                }
            ]
        },
        "TrainingSession": {
            "name": "TrainingSession",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "programID": {
                    "name": "programID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "orderedProgramListID": {
                    "name": "orderedProgramListID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "exerciseOrder": {
                    "name": "exerciseOrder",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "exercises": {
                    "name": "exercises",
                    "isArray": true,
                    "type": {
                        "model": "Exercise"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": [
                            "trainingSessionExercisesId",
                            "trainingSessionExercisesOrderedProgramListID",
                            "trainingSessionExercisesProgramID"
                        ]
                    }
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "programTrainingSessionsId": {
                    "name": "programTrainingSessionsId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "programTrainingSessionsOrderedProgramListID": {
                    "name": "programTrainingSessionsOrderedProgramListID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "TrainingSessions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "id",
                            "orderedProgramListID",
                            "programID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "gsi-Program.trainingSessions",
                        "fields": [
                            "programTrainingSessionsId",
                            "programTrainingSessionsOrderedProgramListID"
                        ]
                    }
                }
            ]
        },
        "Exercise": {
            "name": "Exercise",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "trainingSessionID": {
                    "name": "trainingSessionID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "programID": {
                    "name": "programID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "orderedProgramListID": {
                    "name": "orderedProgramListID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "numSets": {
                    "name": "numSets",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "minReps": {
                    "name": "minReps",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "maxReps": {
                    "name": "maxReps",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "trainingSessionExercisesId": {
                    "name": "trainingSessionExercisesId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "trainingSessionExercisesOrderedProgramListID": {
                    "name": "trainingSessionExercisesOrderedProgramListID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                },
                "trainingSessionExercisesProgramID": {
                    "name": "trainingSessionExercisesProgramID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Exercises",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "id",
                            "orderedProgramListID",
                            "programID",
                            "trainingSessionID"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "gsi-TrainingSession.exercises",
                        "fields": [
                            "trainingSessionExercisesId",
                            "trainingSessionExercisesOrderedProgramListID",
                            "trainingSessionExercisesProgramID"
                        ]
                    }
                }
            ]
        }
    },
    "enums": {},
    "nonModels": {},
    "codegenVersion": "3.4.4",
    "version": "def4c928cc50da99823d4bc8a1d1d88a"
};