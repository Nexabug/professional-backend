# Async Functions and Database Connection

Jab bhi hum `async` function banate hain, woh hamesha ek **Promise** return karta hai. Isi wajah se hum uske saath `.then()` aur `.catch()` laga sakte hain.

Agar database connection successfully establish ho jata hai, tab hume apni application ko start karna hota hai aur requests ke liye listen karwana hota hai. Isi liye successful connection ke baad hum `app.listen()` call karte hain.

---

# Required Packages

Is lecture mein humne do naye packages install kiye:

```bash
npm install cookie-parser
npm install cors
```

### cookie-parser

Ye package incoming request ke saath aane wali cookies ko read aur parse karne mein help karta hai.

### cors

Ye package frontend aur backend ke beech communication ko control karne ke liye use hota hai.

---

# app.use()

Jab bhi hume koi middleware ya configuration Express application mein register karni hoti hai, hum `app.use()` ka use karte hain.

Example:

```js
app.use(cors());
app.use(cookieParser());
```

`app.use()` Express ko batata hai ki har request ke saath kaunsa middleware execute karna hai.

---

# Data Handling Preparation

Backend mein data kai alag-alag sources se aa sakta hai:

- Request Body
- URL Parameters
- Query Parameters
- Cookies
- Headers
- Files

Isi liye hum pehle se configuration aur middleware setup karte hain taaki har type ke incoming data ko properly handle kiya ja sake.

---

# CORS Kya Karta Hai?

CORS (**Cross-Origin Resource Sharing**) browser security policy ko manage karta hai.

Example configuration:

```js
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }),
);
```

### origin

Sirf specified frontend origin ko backend se communicate karne ki permission milegi.

### credentials: true

Browser ko allow karta hai ki woh request ke saath credentials bhi bhej sake, jaise:

- Cookies
- Session IDs
- Authorization Tokens

Matlab agar frontend login user ki cookies backend ko bhejna chahta hai, to `credentials: true` enable hona zaruri hai.

---

# Middleware Kya Hota Hai?

Middleware ek function hota hai jo request aur response ke beech execute hota hai.

Ye request ko check, modify ya validate kar sakta hai aur phir request ko aage bhejta hai.

### Example

Agar aap Instagram par kisi user ki profile open karte ho, to profile data dikhane se pehle backend kuch checks kar sakta hai:

- User logged in hai ya nahi
- User ke paas permission hai ya nahi
- Account private hai ya public
- User blocked to nahi hai

Ye sab checks middleware ke through kiye ja sakte hain.

---

# Middleware Parameters

Normal route handlers mein aksar do parameters hote hain:

```js
(req, res)
```

Lekin middleware mein generally teen parameters hote hain:

```js
(req, res, next)
```

Aur error-handling middleware mein chaar parameters hote hain:

```js
(err, req, res, next)
```

---

# next() Kya Hota Hai?

`next()` ek function hai jo Express ko batata hai ki current middleware ka kaam complete ho gaya hai aur ab agla middleware ya route handler execute kiya ja sakta hai.

Example:

```js
const middleware = (req, res, next) => {
  console.log("Middleware Executed");
  next();
};
```

Agar `next()` call nahi kiya gaya, to request wahi ruk sakti hai aur aage nahi badhegi.

Isi liye `next()` ka use middleware ke andar kiya jata hai.

---

# Utility Functions

Application mein kuch code aisa hota hai jo baar-baar use hota hai.

Jaise:

- Database helpers
- Error handlers
- Response handlers
- Authentication helpers

In reusable functions ko hum `utils` folder mein rakh dete hain taaki code clean aur maintainable rahe.

---

# Async Handler

Express async functions ke errors ko automatically handle nahi karta.

Is problem ko solve karne ke liye hum ek **Async Handler** banate hain.

Async Handler ek wrapper function ki tarah kaam karta hai jo async route handlers ko wrap kar leta hai.

Example:

```js
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
      .catch((err) => next(err));
  };
};
```

---

# Async Handler Kaise Kaam Karta Hai?

1. Async route function execute hota hai.
2. Agar function successfully complete ho jata hai, to response send ho jata hai.
3. Agar koi error aata hai, to `.catch()` us error ko capture kar leta hai.
4. Error ko `next(err)` ke through Express ke error handler tak bhej diya jata hai.

Isse hume har route mein baar-baar `try...catch` likhne ki zarurat nahi padti.

---

