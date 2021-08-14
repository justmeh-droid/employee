const express = require('express')
const Employee = require('../models/employee')

const router = new express.Router()

router.post('/employee',async(req,res)=>{

    try{
        const newEmployee = Employee(req.body)
        await newEmployee.save()
        res.status(201).send(newEmployee)
    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }

})

router.get('/employee',async (req,res)=>{
    try{
        const employees = await Employee.find({})
        res.send(employees)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/employee/:id', async(req,res) => {
    try{
        const id = req.params.id
        const emp = await Employee.findById(id)

        if(!emp){
            return res.status(404).send()
        }
        
        return res.send(emp)

    } catch(e) {
        res.status(500).send({e})
    }

})

router.delete('/employee/:id' , async(req,res)=>{
    try{
        const id = req.params.id
        const emp = await Employee.findByIdAndDelete(id)
        if(!emp){
            return res.status(404).send()
        }

        res.send(emp)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/employee/:id' , async(req,res) => {
        try{
            const params = Object.keys(req.body);
            allowedParams = ['name','salary','gender','team','address']
            const isValid = params.every((param)=> allowedParams.includes(param))
            if(isValid){
                const originalEmployee = await Employee.findById(req.params.id,{ runValidators: true })

                params.forEach((param) =>{
                    originalEmployee[param] = req.body[param]
                })
                await originalEmployee.save()
                return res.send(originalEmployee);
            }

        res.status(500).send('Invalid parameters')
        }catch(e){
            res.status(500).send()
            console.log(e)
        }
})

module.exports = router