import { Request, Response, NextFunction } from 'express';
import { AddressInterface, CompanyInterface, UserInterface, UserProfileInterface } from '../../apis/models';
import { VALIDATION_ERROR_STATUS } from '../../enums';
// eslint-disable-next-line import/order
import Joi = require('joi');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  organizationId: Joi.number().required(),
  roleId: Joi.number().required(),
  name: Joi.string().required(),
});

const empSignupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createAdminSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.number().equal(3),
});

const userProfileSchema = Joi.object({
  phone: Joi.string().required(),
  address: Joi.string().required(),
  linkedIn: Joi.string().optional(),
  age: Joi.number().required(),
  gender: Joi.number().required(),
  empStatus: Joi.string().required(),
  anIncome: Joi.number().required(),
  gradComDate: Joi.date().optional(),
  education: Joi.string().required(),
});

const companySchema = Joi.object({
  logo: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().min(50).max(750).required(),
  line1: Joi.string().optional(),
  line2: Joi.string().optional(),
  industryId: Joi.number().required(),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.number().optional(),
});

const addressSchema = Joi.object({
  line1: Joi.string().optional(),
  line2: Joi.string().optional(),
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipcode: Joi.number().optional(),
});

const companyUpdateSchema = Joi.object({
  logo: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().min(50).max(750).required(),
  industryId: Joi.number().required(),
});

const jobSearchFilterSchema = Joi.object({
  search: Joi.string().required(),
  geoLocation: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lng: Joi.number().min(-180).max(180).required(),
  }).optional(),
  radius: Joi.number().optional(),
  trDuration: Joi.array().items(Joi.number().min(1)).optional(),
  trType: Joi.array().items(Joi.string()).optional(),
  hourlyRate: Joi.object({
    min: Joi.number().min(0).required(),
    max: Joi.number().min(0).required(),
  }).required(),
  // eslint-disable-next-line no-useless-escape
  startDates: Joi.array().items(Joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)).optional(),
});


const jobSkillSchema = Joi.object({
  skill: Joi.string().required(),
  jobId: Joi.number().required(),
});

const jobStartDateSchema = Joi.object({
  date: Joi.string().required(),
  time: Joi.string().required(),
});


const updatJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  trainingType: Joi.string().required(),
  trDescription: Joi.string().required(),
  trDuration: Joi.number().required(),
  isPaid: Joi.boolean().required(),
  noOfOpenings: Joi.number().min(1).required(),
  hourlyRate: Joi.number().min(0).required(),
});

const createJobSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  trainingType: Joi.string().required(),
  trDescription: Joi.string().required(),
  trDuration: Joi.number().required(),
  isPaid: Joi.boolean().required(),
  noOfOpenings: Joi.number().min(1).required(),
  hourlyRate: Joi.number().min(0).required(),
  photos: Joi.array().items(Joi.string()).required(),
  questions: Joi.array().items(Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  })).min(1).required(),
  startDates: Joi.array().items(
    jobStartDateSchema,
  ),
  skills: Joi.array().items(Joi.string().required()).required(),
});

const createQuestionSchema = Joi.object({
  question: Joi.string().required(),
  category: Joi.number().required(),
  type: Joi.number().required(),
  options: Joi.array().items(
    Joi.object({
      option: Joi.string().required(),
    }).optional(),
  ).min(0).required(),
});
export const validateEmpSignup = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body;
  const { error } = empSignupSchema.validate(user);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateUserSignup = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body;
  const {  error } = schema.validate(user);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateUserLogin = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body;
  const {  error } = loginSchema.validate(user);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const user: UserProfileInterface = req.body;
  const {  error } = userProfileSchema.validate(user);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateAdminCreation = (req: Request, res: Response, next: NextFunction) => {
  const user: UserInterface = req.body;
  const {  error } = createAdminSchema.validate(user);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateCompany = (req: Request, res: Response, next: NextFunction) => {
  const company: CompanyInterface = req.body;
  const {  error } = companySchema.validate(company);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateCompanyAddress = (req: Request, res: Response, next: NextFunction) => {
  const companyAddress: AddressInterface = req.body;
  const {  error } = addressSchema.validate(companyAddress);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateCompanyUpdateInfo = (req: Request, res: Response, next: NextFunction) => {
  const companyAddress: CompanyInterface = req.body;
  const {  error } = companyUpdateSchema.validate(companyAddress);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateJobSearchFilter = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = jobSearchFilterSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateCreateJob = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = createJobSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const updateJobSchema = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = updatJobSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateAddJobSkill = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = jobSkillSchema.validate({...req.body, jobId: req.query.jobID});
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateUpdateJobSkill = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = jobSkillSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateJobStartDate = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = jobStartDateSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};

export const validateCreateQuestions = (req: Request, res: Response, next: NextFunction) => {
  // const companyAddress: CompanyInterface = req.body;
  const {  error } = createQuestionSchema.validate(req.body);
  if (!error) {
    return next();
  } 
  return res.status(VALIDATION_ERROR_STATUS).json({ message: error.details[0].message });
    
};