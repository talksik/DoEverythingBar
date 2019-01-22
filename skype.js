function skypeCall(username)
{
    Skype.ui({
        "name": "call",
        "element": "SkypeButton_Call_" + username + "_1",
        "participants": [username]
    })
}
