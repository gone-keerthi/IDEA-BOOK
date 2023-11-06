const express = require('express');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const cors = require ('cors');
const dotenv = require ('dotenv');
const bcrypt = require ('bcrypt');

const User = require('./models/user');
const Quiz = require('./models/quiz');
const Question = require('./models/questions');
const Answer = require('./models/answer');
const quiz = require('./models/quiz');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.static('./public'));

app.set("view engine","ejs");

app.get('/', (req,res) => {
  // console.log('hello');
    res.send('hello')
});

app.post('/signup', async (req, res) => {
  const { name, email, password }  = req.body;
  console.log(req.body);

  try {
    // Check if the email or mobile number is already registered
    const existingUser = await User.findOne({ email } );
    if (existingUser) {
      return res.status(400).json({ message: 'Email or mobile number is already registered.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/quiz', async(req,res) => {
 const { quizName,qnaType } = req.body;
 const createdAt = new Date();
//  const questions = await quiz.findById(req.body._id)
//  quiz.questions.push()
//  console.log(questions)
 try{
 const newQuiz = new Quiz({
  quizName,
  qnaType,
  createdAt
 })
  await newQuiz.save();
  res.status(201).json({message:"quiz data added successfully..."});
}catch(error){
  console.log(error)
  res.status(500).json({ message: "Internal server error" });
}
});

app.get('/quiz', async(req,res) => {
  try {
    const quizData = await Quiz.find();
    res.json(quizData);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
app.get('/quiz/length', async (req, res) => {
  try {
    const quizLength = await  Quiz.countDocuments();
    res.json({ length: quizLength });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching quiz length' });
  }
});

app.post('/question', async(req,res) => {
  // const {QuestionNumber,question,optionType,options,correctOption,timer} = req.body;
  const data = req.body;
  // const quiz = await Quiz.findById(data.id);
  // quiz.questions.push({
  //   question:data.question,
  //   options:data.options,
  //   correctOption: data.correctOption,
  //   order:data.order
  // }) 
  // quiz.save()
  // console.log(QuestionData)
  try {
    // const newQuestion = new Question(QuestionData);
    let quiz = await Quiz.find({_id: new mongoose.Types.ObjectId( data.id)});
    quiz = quiz[0]
    console.log(quiz);
    console.log(data)
    if(!quiz){
      res.send({message:"Invalid id for the quiz"})
      return;
    }
    quiz.questions.push({
      question:data.question,
      options:data.options,
      correctOption: data.correctOption,
      order:data.order
    });

  await quiz.save()
    res.status(201).json({message:"successfully added question"});
  } catch (error) {
    console.error("Error adding the question:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/question/length', async(req,res) => {
  try{
    const questionLength = await Question.countDocuments();
    res.json({length : questionLength});
  }catch (error) {
    res.status(500).json({error: 'error fetching question length' });
  }
});

app.post('/quiz/impression/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    quiz.impressions += 1;
    await quiz.save();

    res.status(200).json({ message: 'Impression incremented for the quiz.' });
  } catch (error) {
    console.error('Error incrementing impression:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`server is running on port: ${process.env.PORT}`);
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
});