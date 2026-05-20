# Lecture Notes

Is lecture mein hum **User Model** aur **Video Model** banayenge.

User aur Video models banane ke baad hum Video model ke liye ek package install karte hain:

```bash
npm install mongoose-aggregate-paginate-v2
```

## mongoose-aggregate-paginate-v2 kya karta hai?

Ye package large search results ya large data lists ko multiple pages mein divide karne ke liye use hota hai. Is process ko **pagination** kehte hain.

Example:

Agar database mein 1000 videos hain, to saari videos ek hi response mein bhejne ke bajay hum unhe pages mein divide kar sakte hain:

* Page 1 → 10 videos
* Page 2 → Next 10 videos
* Page 3 → Next 10 videos

Isse performance improve hoti hai aur data handle karna easy ho jata hai.

Ye package Mongoose plugin ke roop mein use hota hai.

```js
videoSchema.plugin(mongooseAggregatePaginate);
```

---

# Password Hashing with bcrypt

Ab password ko secure rakhne ke liye hum `bcrypt` package install karenge.

Password ko plain text mein database mein store karna secure nahi hota, isliye hum password ko **hash** karke store karte hain.

Password hashing ke liye hum Mongoose ka `.pre()` middleware (hook) use karte hain.

`.pre("save")` ka matlab hai ki database mein document save hone se pehle diya gaya code execute hoga.

Example:

```js
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } else {
    return next();
  }
});
```

### Is code mein kya ho raha hai?

1. Jab bhi user save hoga, ye middleware execute hoga.
2. `this.isModified("password")` check karta hai ki password field change hui hai ya nahi.
3. Agar password change hua hai, to `bcrypt.hash()` us password ko hash kar dega.
4. Hashed password database mein save hoga.
5. Agar password change nahi hua hai, to hashing skip karke `next()` call kar diya jayega.


---

# Custom Method for Password Comparison

Ab login ke time user jo password enter karega usse database wale hashed password ke saath compare karna padega.

Iske liye hum ek custom method banate hain:

```js
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
```

### Kaise kaam karta hai?

* `password` → User ka entered password
* `this.password` → Database mein stored hashed password

`bcrypt.compare()` dono ko compare karta hai:

* Match hua → `true`
* Match nahi hua → `false`

---

# JWT (JSON Web Token)

Authentication ke liye hume ek aur package chahiye:

```bash
npm install jsonwebtoken
```

JWT (**JSON Web Token**) ek secure token hota hai jo user ki identity verify karne ke liye use kiya jata hai.

Backend applications mein JWT ka use mainly:

* Access Token generate karne ke liye
* Refresh Token generate karne ke liye

kiya jata hai.

---

# Environment Variables

Hum `.env` file mein kuch naye variables add karte hain:

```env
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
```

### Inka kaam

* `ACCESS_TOKEN_SECRET` → Access token sign karne ke liye secret key
* `ACCESS_TOKEN_EXPIRY` → Access token kitni der valid rahega
* `REFRESH_TOKEN_SECRET` → Refresh token sign karne ke liye secret key
* `REFRESH_TOKEN_EXPIRY` → Refresh token kitni der valid rahega

---

# Access Token Generate Karna

User schema mein hum ek custom method banate hain:

```js
userSchema.methods.generateAccesstoken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};
```

### `jwt.sign()` kya leta hai?

`jwt.sign()` generally 3 arguments leta hai:

1. **Payload** → Token ke andar ka data
2. **Secret Key** → Token ko sign karne ke liye
3. **Options Object** → Additional settings (jaise expiry)

### Payload mein kya bheja gaya hai?

```js
{
  _id: this._id,
  email: this.email,
  username: this.username,
  fullname: this.fullname,
}
```

Ye information token ke andar store hogi aur baad mein verify ki ja sakti hai.

Access token normally short time ke liye valid hota hai.

---

# Refresh Token Generate Karna

Refresh token ke liye alag method banaya gaya hai:

```js
userSchema.methods.generateRefreshtoken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};
```

### Access Token aur Refresh Token mein Difference

#### Access Token

* User ko authorize karne ke liye use hota hai
* Short expiry hoti hai
* Har protected request mein bheja jata hai

#### Refresh Token

* Naya access token generate karne ke liye use hota hai
* Long expiry hoti hai
* Generally database mein store kiya jata hai

Refresh token ki help se user ko baar-baar login karne ki zarurat nahi padti.

---
