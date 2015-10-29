# Feedhenry Sample Service Using data from the Internet for Data Sources

This sample RESTful service has 2 endpoints, `/hobbies` and `/sw` for loading data from the Internet and then properly formatting it as a Data Source

The `/hobbies` endpoint will "scrape" the website,  http://www.notsoboringlife.com/list-of-hobbies/, parse the HTML, and produce a list.

The `/sw` endpoint will use the Open Source Star Wars API, http://swapi.co/, and get a list of Star Wars Films.

An example of the Data Sources format is below:

    [
        {
            "key": "some_key",
            "value": "some_value"
        }
    ]

You can also choose which item is to be selected by default by adding the "selected" property


    [
        {
            "key": "some_key",
            "value": "some_value"
        },
        {
            "key": "other_key",
            "value": "other_key",
            "selected": true
        }
    ]

