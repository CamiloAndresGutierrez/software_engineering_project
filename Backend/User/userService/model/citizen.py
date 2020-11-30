class Citizen:
    def __init__(self, name=None, surname=None, username=None, password=None, documentation=None, Id=None, gender=None, department=None, municipality=None, neighbourhood=None, address=None):
        self.name=name
        self.surname=surname
        self.username=username
        self.password=password
        self.documentation=documentation
        self.Id=Id
        self.gender=gender
        self.department=department
        self.municipality=municipality
        self.neighbourhood=neighbourhood
        self.address=address
    
    def getInfoMap(self):
        return {
            "name" : self.name,
            "surname" : self.surname,
            "username" : self.username,
            "password" : self.password,
            "documentation" : self.documentation,
            "Id" : self.Id,
            "gender" : self.gender,
            "department" : self.department,
            "municipality" : self.municipality,
            "neighbourhood" : self.neighbourhood,
            "address" : self.address
        }
    def getName(self):
        return self.name