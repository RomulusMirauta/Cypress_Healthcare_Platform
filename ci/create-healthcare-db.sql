-- Minimal schema for tests - adjust to reflect production schema as needed
IF DB_ID('HealthcareDB') IS NULL
  CREATE DATABASE HealthcareDB;
GO
USE HealthcareDB;
GO
 -- Example patients table
 IF OBJECT_ID('Patients') IS NULL
 CREATE TABLE Patients (
   PatientID INT IDENTITY(1,1) PRIMARY KEY,
   FirstName NVARCHAR(100),
   LastName NVARCHAR(100),
   DOB DATE,
   Gender NVARCHAR(50),
   Address NVARCHAR(255)
 );
GO

 -- Example drugs table
 IF OBJECT_ID('Drugs') IS NULL
 CREATE TABLE Drugs (
   DrugID INT IDENTITY(1,1) PRIMARY KEY,
   Name NVARCHAR(255),
   Description NVARCHAR(1000),
   Dosage NVARCHAR(100)
 );
GO
