/*
Notes and keypoints from
MongoDB Essentails Udemy course
*/



//NOTE:  more methods are described with examples and ability to practice here:
//https://docs.mongodb.com/manual/tutorial/query-documents/

Unlike SQP which uses Tables,
MongoDB uses "Documents", which are basically like JavaScript objects


the docuemnts look like JSON objects in JavaScript, but are called BSON
(JSON = JavaScript Object Notation, which is used to pass data from the view to the server and back)
You can tell a BSON docuemnt because it has quotations "" around both key : value pairs, unlike JSON.

Example:
{
  "title" : "Article Two".
  "Category" : "Education",
  "body" : "this is the body"
}

A Collection  is a group of MongoDB Documents

Cannot use Joins to join tables like in SQL
instead they use reference to link between documents.

//Advantages over SQL
-Easy to iterate trhough
-More scalable
-Object-orients very similar to JavaSript
-Better handles unstructured data
-less rigid


To get up and running,
-Need to open two instances of Command Prompt. Might need to run them as administrator by right click on them when opening
-Change directory to be: C:\Program Files\MongoDB 2.6 Standard Legacy\bin
-Make sure that there is a folder directory on your PC that is C:\data\db.
-In one of the command windows, type:  mongod
-in the second window type:  mongo


//some of the most common commands:

-show dbs  :  shows all the dabases created

-use  :  can use any of those databases, and also can create a new one and giving what ever name we want

-use test   :  this would switch to db called  test

-show collections  : this would show what collections have been created in this database called test

-db.things.find<>   :  here "things" is the name of the collection, this will list all the documents (tables) in this database




//practice to create a JSON object:
{
  firstname: "bill",
  lastname: "cruz"
}


//more common commands:

-db.things.find().pretty()  :  does the same but displays all documents in a much easier to read format in the command prompt
//NOTE some ()  may actually be <>


//working through example:
-use example   (this creates a db called example)

Note:   " db. "  is prefix that is always used when using the mongo shell

-db.createCollection("cars")

-show collections   (shows the cars collection we just created)



//another example
//recommended to first time in text editor
//then copy and paste that into the command prompt
//NOTE: to Control P in command promt: Atl+Space, then Edit and Paste

to add a new document (table) into our cars collection write:

db.car.insert({
  name: 'honda',
  make: 'accord',
  year: '2010'
})

this is a JSON object, but it gets converted into a BSON object

db.car.find().pretty()     which shows that this JSON now shows up in our car database as a BSON object

//change a detail in a document(table)
db.car.update({
  name: "honda"
  },
  {$set: {
  name: "ford"
  }
})

db.car.find().pretty()   shows that it has been modified properly


//to add something new (a new field,  ie a new column) to our document(table)
//by using:      ,{$upsert: true}
db.car.update(
  {  name: 'ford'  },
  {$set: {  transmission: 'ford'  }},
  {$upsert: true}
)


db.car.find().pretty()   shows that it has been modified properly


//to remove something:
db.car.remove({name: "ford"})    this removes that entire document(table)


//using a for loop to insert 10 documents (tables) into whatever collection:
//example with adding 10 documents into the collection called "things"

db.createCollection("things")

for(var i = 0; i < 10; i++) (db.things.insert({"x": i}) )

db.things.find().pretty()    shows the 10 documents each with a value of x from 0-9


/*6 tyoes of data can be stored:

- String:   {  name: "John"  }

- Number:   {  apples: 5  }

- Boolean:  {  published:  true  }

- Array:  tags: Array  or tags: []     {  tags: ["tag1", "tag2"]   }

- Date:     {  timeStamp: ISODate("...")   }

- ObjectId: {  _creator: "41239878"  }


2 Other types:

Buffer - for media like videos

Mixed - combination of different types

*/



//Different ways / methods to Query

find()

sort()

limit()


//NOTE:  more methods are described with examples and ability to practice here:
//https://docs.mongodb.com/manual/tutorial/query-documents/



//Example:

use example

db.createCollection("students")


//Add students in one paste into command:
db.student.insert({
    name: 'Joe',
    undergrad: true,
    units: 9,
    classes: ['geography', 'math', 'journalism']
})

db.student.insert({
    name: 'Jane',
    undergrad: false,
    units: 12,
    classes: ['geography', 'science', 'journalism', 'history']
})

db.student.insert({
    name: 'Kevin',
    undergrad: true,
    units: 3,
    classes: ['geography']
})

db.student.insert({
    name: 'Rachel',
    undergrad: false,
    units: 6,
    classes: ['geography', 'history']
})
//end of adding students


db.student.find().pretty()  //this shows all 4 students


//if you want to get back ALL the documents in a collection:
db.student.find({})  //{} is an empty objects

//look for all info on a particular student (that whole document(table)):
db.student.find({'name': 'Rachel'})
db.student.find({'name': 'Rachel'}).pretty()


//Filter methods:
//  METHOD: $lt and  $gt     mean   less than   /  greater than

//to filter for units that are greater than 6:
db.student.find({units: {$gt: 6}})
db.student.find({units: {$gt: 6}}).pretty()


// METHOD:   $in   (find occurence of "")
//NOTE  to use $in, always need to specify and array:
//  {$in: ['whatever']}

//to find all students enrolled in History
db.student.find({classes: {$in: ['history']}})
db.student.find({classes: {$in: ['history']}}).pretty()

//to find enrolled in history OR(?) geography:
db.student.find({classes: {$in: ['history','geography']}})
db.student.find({classes: {$in: ['history','geography']}}).pretty()


//SORTING METHODS:

//.sort()
//   1 = ascending
//  -1 = descending

// .sort({thingtosortby: 1})  ascending
// .sort({thingtosortby: -1})  descending


//numerical sorting occurs on a number
//sort students so fewer units appear at the top, most units at the bottom
db.student.find({classes: {$in: ['history']}}).sort({units: 1})  //ascending
db.student.find({classes: {$in: ['history']}}).sort({units: -1})  //descending

//alphabetical sorting occurs on a String

//to sort all the students by name:
db.student.find({}).sort({name: 1})


//LIMIT METHOD:
//.limit()       to limit the number of results that we get back

//only give me the first 2 that you find:
db.student.find({}).sort({name: 1}).limit(2)




//NOTE:
//more methods are described with examples and ability to practice here:
//https://docs.mongodb.com/manual/tutorial/query-documents/










////
