const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const mongoose = require('mongoose');
const path = require('path');


const User = require('../../models/User');


const { config } = require('../../../config/config');
const url = config.apiUrl;




router.get('/test',(req, res) => res.json({msg: 'Users Works!'}) );

module.exports = router;
