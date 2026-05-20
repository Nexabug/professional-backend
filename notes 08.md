to ham is wale lec me user ka modela and video ka model banyenge

to after making the user and video models ham video wale ke liye ek pkg download kar rahe hai `npm install mongoose-aggregate-paginate-v2` 

what it does that make pages of the serch results matlab jo list hote hai big big unko simple pages me thod deta hai

ye as a pluging us ehota hai mongoose me baki kuch nhi hai

```
videoSchema.plugin(mongooseAggregatePaginate)
```
to ab ham password ko hash karne liye ham `bcrypt` pkg install karenge

and hame ek pkg ki jarurat hogi jiska naam hai jwt(jsonwebtoken) to isse 

JWT (JSON Web Token) ek secure token hota hai jo user ki identity ko verify karne ke liye use hota hai

to passwod ko hash karne ke liye ham ham bcrypt ka use karenge usko chalnae ke liye ham 

`.pre()` hook means save karne se pahle save kar diya to usko karne ke liye 
to usme ham jo bhi code excute karna hai usko ham likh denge usme

```
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
    next();
  } else {
    return next();
  }
});
```

to ham yha pe kar ye rahe ahi ki save hone se just pahle ham dakhe rahe hai ki pass me koi change to nhi hai na agar change

hai to to ham directly hi ham password ko encrypt kar denge

agar nhi hai to next ko call kar dege means iska kaam ho gya hai 

now ab ham ek custom methods bante hai jiise ham ye check karenge ki ye password jo comparison ki liye aya hai wo true hai ki nhi

```
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}
```

