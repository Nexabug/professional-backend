starting the step up with the `npm init`

init the git 
-git init  (files ko initilize karne ke liye)
-git add .  (sabhi filese ko bhjene ke liye)
-git commit -m "add init" ( comoint messgae dene ke liye)
-git branch -M main (brach change to mmaster to  main)
-git remote add origin <repo_link> ( is repo me dalana hai wo)
-git push -u origin main  ( main me push kar do wo)

then we will make the folder and file structure 
-public and then temp yaha pe localy images ya chize store karenge baad me inme se cloud pe bhej denge 

then to check the git status ki wo kitne files ko bhejega uske liye
`git status`

git hamara sirf files ko track karta hai na ki folders ko 

agar hamko koi folders ko bhi git ke status me dalna hai to jaise ham 

.gitignore bante the waise hi ab ham .gitkeep banyenge jisse wo usko track karega

and market me `.gitignore` bhi milt ehai bane banye e.g:- .gitignore genrator

then make the `.env` file to get the valuable info

now we will make another src folder inwhich ham 3 files banyenge

app.js , constants.js , index.js

ab ham ek dev dependency download karenge jo ye karega ki jab jab ham koi naya content aad kar rahe the wo usko dekhne ke liye hame baar baar server ko restart karna pad raha tha to uske liye ham ek devdepency hai jiska naam hai 

`nodemon` download karenge

to download any thing for the devlopment only do the
format :- `npm i -D <pkg_name>`
eg:- `npm i -D nodemon`

then pakage me ja akar script me 
`"dev": "nodemon src/index.js"`

daal denge

now ab ham folders banyenge
by `mkdir <folders_name>`

ye sab folders hame bana hai 
`mkdir controllers db middlewares models routes utils`


lec 06

to ham database ke liye mongo db use kar rahe hai to hamne mongodb pe jaa kar ek project bana liya then 

ab ham wha se jo uri hai usko laa kar apne .env wale me daal denge and then hamne jo constant wla file banyi thi usme jaa kar ham mongo_db ka naam export karenge

`export const DB_NAME = "NAME"`

to database ka connection karne ke 2 method hai like the first is ki ham apana jo bhi connection hai wo sab ke sab index.js wali file me hi likhe de and second ki ham jaa kar db naam ke jo folder hai usme ek file me wo code likh de then waha se export kar ke usko chalye index.js me

chahe koi sa bhi method lagao hame ek chiz ka dhyan rakhhna hai ki ham jab bhi db connect karna ho to hamesa async await and try and catch se hi karo ye btter apporach hai


to first method me pahle ham
1. ham ek ify ()() banying index me and then ham ek async fun banyenge
2. then ham try me mongodb ko connect karenge uri and db name se then
3. catch karenge agar koi err hai to 
4. then ab ham express ko import kar ke dekhne ki app err to nhi de raha hai na 
5. agar nhi de raha hai fir to hame app ko listen kar lena port pe jo .env me hai

fullcode:-
```
(async() => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

       app.on("error", (error)=>{
        console.log("err: ", error)
        throw error
       })
       
       app.listen(process.env.PORT,()=>{
        console.log(`app is listing is at http://localhost:${process.env.PORT}`)
       })
    } catch (error) {
        console.error("error :", error)
        throw err
    }
})()
```

second method

to isme ham jo bhi hamara kaam hai usko ham db/index.js me jaa kar rate hai

full code:

```
const connectDB = async () =>{
    try{
      const conectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("conection succefully" ,conectioninstance.connection.host)
    }catch(err){
        console.log("mongo db conection err" , err)
        process.exit(1);
    }
}
```
then ham isko export kar lene then jaha pe bhi chaiy ewha ja kar isko import jakar import kar leneg



