const express = require('express');
const { MongoClient, Timestamp } = require('mongodb');
const {ObjectId} = require('mongodb');
const dotenv = require('dotenv');
const saslprep = require('saslprep');
dotenv.config();
const app = express();
const cors = require('cors');
app.use(cors());
const uri = process.env.ATLAS_URI;
const client = new MongoClient(uri);
let PORT = process.env.PORT || 3000;
let connectedClient, db;
async function connectToMongoDB(){
    try {
        connectedClient = await client.connect();
        console.log('Dan connected to MongoDB!');
    } catch (error) {
        console.log(error);
    } finally {
        db = connectedClient.db('Olea');
        app.listen(PORT, () => {
            console.log(`Dan's Server is listening on port ${PORT}`);
        })        
    }
}
connectToMongoDB();
app.use(express.static('public'))



app.set('view engine','ejs')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/checklist', (request,response)=>{
    response.render('checklist.ejs')
})


app.get('/', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('index.ejs', {info: data})
    })
})
app.get('/sparkling', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('sparkling.ejs', {info: data})
    })
})

app.get('/btg', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('wineBTG.ejs', {info: data})
    })
})

app.get('/riojas', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('riojas.ejs', {info: data})
    })
})
app.get('/liquorFormat', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('liquorFormat.ejs', {info: data})
    })
})
app.get('/liquors', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('vodka.ejs', {info: data})
    })
})
app.get('/vodka', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('vodka.ejs', {info: data})
    })
})
app.get('/gin', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('gin.ejs', {info: data})
    })
})
app.get('/rum', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('rum.ejs', {info: data})
    })
})
app.get('/tequila', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('tequila.ejs', {info: data})
    })
})
app.get('/bourbon', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('bourbon.ejs', {info: data})
    })
})
app.get('/rye', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('rye.ejs', {info: data})
    })
})
app.get('/scotch', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('scotch.ejs', {info: data})
    })
})
app.get('/japaneseWhisky', (request, response) =>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        response.render('japaneseWhisky.ejs', {info: data})
    })
})
app.get('/dinnerLayout', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerLayout.ejs', {info: data})
    })
})
app.get('/dessertsLayout', (request,response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data=>{
        response.render('dessertsLayout.ejs', {info:data})
    })
})
app.get('/dessertsLayoutBack', (request,response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data=>{
        response.render('dessertsLayoutBack.ejs', {info:data})
    })
})
app.get('/dessertsBackPrint', (request,response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data=>{
        response.render('dessertsBackPrint.ejs', {info:data})
    })
})
app.get('/debug', (request, response) =>{
    db.collection('Specials').find({
        category: "SPECIALS: Appetizer",
        sequence: "3"
    })
        .toArray()
    .then(data => {
        response.render('debug.ejs', {info: data})
    })
})
app.get('/riojasPrintPreview', (req,res)=>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        res.render('riojasPrintPreview.ejs',{info:data})
    })
})
app.get('/liquorPrint', (req,res)=>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        res.render('liquorPrint.ejs',{info:data})
    })
})
app.post('/saveChangesRiojas', async(req,res)=>{
    console.log(req.body);
    if (req.body.riojasPaddingTop != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("658db8c6020f08a1825ede0b")},{
            $set:{
                pixels: `${req.body.riojasPaddingTop}px`
            }
        })
    }
    if (req.body.riojasPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("658f12b967ed9ab85d618ed8")},{
            $set:{
                pixels: `${req.body.riojasPaddingSides}px`
            }
        })
    }
    if (req.body.riojasFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65905f64f08a10527e5617fb")},{
            $set:{
                pixels: `${req.body.riojasFontSize}px`
            }
        })
    }
    if (req.body.riojasPaddingBetween != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("658db8c6020f08a1825ede0b")},{
            $set:{
                pixels: `${req.body.riojasPaddingBetween}px`
            }
        })
    }


    res.redirect(req.get('referer'))    

})
app.post('/saveChangesDesserts', async(req,res)=>{
    console.log(req.body);
    if (req.body.dessertsPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcf816878fcf9e145f160a")},{
            $set:{
                pixels: `${req.body.dessertsPaddingSides}px`
            }
        })
    }
    if (req.body.dessertsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcf844878fcf9e145f160b")},{
            $set:{
                pixels: `${req.body.dessertsFontSize}px`
            }
        })
    }
    if (req.body.dessertsPaddingBetween != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcf7d2878fcf9e145f1609")},{
            $set:{
                pixels: `${req.body.dessertsPaddingBetween}px`
            }
        })
    }


    res.redirect(req.get('referer'))    

})
app.post('/saveChangesDessertsBack', async(req,res)=>{
    console.log(req.body);
    if (req.body.dessertsBackPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcfdb1878fcf9e145f160d")},{
            $set:{
                pixels: `${req.body.dessertsBackPaddingSides}px`
            }
        })
    }
    if (req.body.dessertsBackFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcfde6878fcf9e145f160e")},{
            $set:{
                pixels: `${req.body.dessertsBackFontSize}px`
            }
        })
    }
    if (req.body.dessertsBackPaddingBetween != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65bcfd76878fcf9e145f160c")},{
            $set:{
                pixels: `${req.body.dessertsBackPaddingBetween}px`
            }
        })
    }


    res.redirect(req.get('referer'))    

})

app.post('/saveChangesLiquor', async(req,res)=>{
    if (req.body.liquorPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65a5facee2f0509d3eee6aa4")},{
            $set:{
                pixels: `${req.body.liquorPaddingSides}px`
            }
        })
    }
    if (req.body.liquorFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65a5f9fae2f0509d3eee6aa3")},{
            $set:{
                pixels: `${req.body.liquorFontSize}px`
            }
        })
    }
    if (req.body.liquorPaddingBetween != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65a5f073e2f0509d3eee6aa2")},{
            $set:{
                pixels: `${req.body.liquorPaddingBetween}px`
            }
        })
    }
    if (req.body.lineHeight != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65a95661c09c3534a640bc5e")},{
            $set:{
                pixels: `${req.body.lineHeight}px`
            }
        })
    }


    res.redirect(req.get('referer'))    

})

app.post('/saveChanges', async (request,response)=>{
    if (request.body.paddingSides != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("6552683e620b78c09f6ad4ee")},{
        $set:{
            pixels: `${request.body.paddingSides}px`
        }
    })
    }
    if (request.body.paddingTop != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("654e59526db7f75b37effb75")},{
        $set:{
            pixels: `${request.body.paddingTop}px`
        }
    })
    }
    if (request.body.h1paddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("65526e13458b31706ba327c6")},{
                $set:{
                    pixels: `${request.body.h1paddingBottom}px`
                }
        })
    }
    if (request.body.headingsPadding != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552745d458b31706ba327c7")},{
                $set:{
                    pixels: `${request.body.headingsPadding}px`
                }
        })
    }
    if (request.body.menuItemsPadding != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("655277f12695fb229cd2f8bb")},{
                $set:{
                    pixels: `${request.body.menuItemsPadding}px`
                }
        })
    }
    if (request.body.lineHeight != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552843bc830309949e62da3")},{
                $set:{
                    pixels: `${request.body.lineHeight}px`
                }
        })
    }
    if (request.body.paddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("6552b499c5ef1e93714ad81b")},{
                $set:{
                    pixels: `${request.body.paddingBottom}px`
                }
        })
    }
    if (request.body.headingsPaddingBottom != "") {
        await db.collection('Specials').updateOne({_id: new ObjectId("65529aad1d34afc4583f9716")},{
                $set:{
                    pixels: `${request.body.headingsPaddingBottom}px`
                }
        })
    }
    if (request.body.legalDisclaimer != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("65529cf61d34afc4583f9717")},{
            $set:{
                display: `${request.body.legalDisclaimer}`
            }
        })
    }
    if (request.body.legalDisclaimerFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552da9842bc2235c2d5166a")},{
            $set:{
                pixels: `${request.body.legalDisclaimerFontSize}px`
            }
        })
    }
    if (request.body.todaysSpecialsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552dcebc7561e1a7e641aaf")},{
            $set:{
                pixels: `${request.body.todaysSpecialsFontSize}px`
            }
        })
    }
    if (request.body.headingsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552deb4c7561e1a7e641ab0")},{
            $set:{
                pixels: `${request.body.headingsFontSize}px`
            }
        })
    }
    if (request.body.menuItemsFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("6552e063c7561e1a7e641ab1")},{
            $set:{
                pixels: `${request.body.menuItemsFontSize}px`
            }
        })
    }
    // setTimeout(()=>response.redirect('/'),250)
    response.redirect('/specialsFormatLayout')    
})

app.post('/saveDinnerMenuChanges', async (request,response)=>{
    
    if (request.body.dinnerMenuFontSize != ""){
    await db.collection('Specials').updateOne({_id: new ObjectId("655f8c429408f905f197480a")},{
        $set:{
            pixels: `${request.body.dinnerMenuFontSize}px`
        }
    })
    }
    if (request.body.dinnerMenuLineHeight != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655faeba8c4c6fb6765f2bad")},{
            $set:{
                pixels: `${request.body.dinnerMenuLineHeight}px`
            }
        })
        }
    if (request.body.oleaLogoFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655ea242d37783c929bb3e17")},{
            $set:{
                pixels: `${request.body.oleaLogoFontSize}px`
            }
        })
    }
    if (request.body.legalDisclaimerFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fc5fe8c4c6fb6765f2bb2")},{
            $set:{
                pixels: `${request.body.legalDisclaimerFontSize}px`
            }
        })
    }
    if (request.body.sidesFontSize != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fcc818c4c6fb6765f2bb3")},{
            $set:{
                pixels: `${request.body.sidesFontSize}px`
            }
        })
    }
    if (request.body.dinnerPaddingSides != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fdfe58c4c6fb6765f2bb4")},{
            $set:{
                pixels: `${request.body.dinnerPaddingSides}px`
            }
        })
    }
    if (request.body.dinnerPaddingTop != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fe14a8c4c6fb6765f2bb5")},{
            $set:{
                pixels: `${request.body.dinnerPaddingTop}px`
            }
        })
    }
    if (request.body.dinnerCenterGap != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fe9d58c4c6fb6765f2bb6")},{
            $set:{
                pixels: `${request.body.dinnerCenterGap}px`
            }
        })
    }
    if (request.body.dinnerMenuItemsPadding != ""){
        await db.collection('Specials').updateOne({_id: new ObjectId("655fffce8c4c6fb6765f2bb7")},{
            $set:{
                pixels: `${request.body.dinnerMenuItemsPadding}px`
            }
        })
    }
        



    // setTimeout(()=>response.redirect('/dinner'),250)
    response.redirect(request.get('referer'))
})
app.get('/specialsLayout', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('specialsLayout.ejs', {info: data})
    })
})

app.get('/specialsUpdate', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('specialsUpdate.ejs', {info: data})
    })
})
app.get('/dessertsUpdateDesserts', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsUpdateDesserts.ejs', {info: data})
    })
})
app.get('/dessertsBack', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsBack.ejs', {info: data})
    })
})
app.get('/dessertsCocktails', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsCocktails.ejs', {info: data})
    })
})
app.get('/dessertsJapaneseWhisky', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsJapaneseWhisky.ejs', {info: data})
    })
})
app.get('/dessertsScotch', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsScotch.ejs', {info: data})
    })
})
app.get('/dessertsBrandy', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsBrandy.ejs', {info: data})
    })
})
app.get('/dessertsGrappa', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsGrappa.ejs', {info: data})
    })
})

app.get('/dessertsPrint', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dessertsPrint.ejs', {info: data})
    })
})

app.get('/dinnerUpdateCuredMeats', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateCuredMeats.ejs', {info: data})
    })
})
app.get('/dinnerUpdateAppetizers', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateAppetizers.ejs', {info: data})
    })
})
app.get('/dinnerUpdateEntrees', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateEntrees.ejs', {info: data})
    })
})
app.get('/dinnerUpdateSides', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerUpdateSides.ejs', {info: data})
    })
})
app.get('/archive', (request, response) =>{
    db.collection('Specials').find().sort({timestamp:-1}).toArray()
    .then(data => {
        response.render('archive.ejs', {info: data})
    })
})
app.get('/specialsPrintPreview', (request, response) =>{
    db.collection('Specials').find().toArray()
    .then(data => {
        response.render('specialsPrintPreview.ejs', {info: data})
    })
})
app.get('/dinnerPrintPreview', (request, response) =>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        response.render('dinnerPrintPreview.ejs', {info: data})
    })
})
app.get('/riojasFormatLayout', (req,res)=>{
    db.collection('Specials').find().sort({price:1}).toArray()
    .then(data => {
        res.render('riojasFormatLayout.ejs', {info:data})
    })
})
app.post('/addSpecial', async(request,response)=>{
    await db.collection('Specials').insertOne({
        category: `${request.body.category}`,
        name: `${request.body.name}`,
        description: `${request.body.description}`,
        price: `${request.body.price}`,
        allergies: `${request.body.allergies}`,
        sequence: Number(request.body.sequence)
    })
    .then(result =>{
        console.log('New Special Added')
        console.log(request.body)
    })
    await db.collection('Specials').updateOne({
        category: `${request.body.category}`,
        name: `${request.body.name}`,
        description: `${request.body.description}`,
        price: `${request.body.price}`,
        allergies: `${request.body.allergies}`
    },{
        $set:{
            timestamp: new Date()
            
        }
    })
    response.redirect(request.get('referer'))
})
app.post('/addAfterDinnerDrink', async(request,response)=>{
    await db.collection('Specials').insertOne({
        category: `${request.body.category}`,
        type: `${request.body.type}`,
        name: `${request.body.name}`,
        description: `${request.body.description}`,
        price: `${request.body.price}`,
        sequence: Number(request.body.sequence)
    })
    .then(result =>{
        console.log('New After Dinner Drink Added')
        console.log(request.body)
    })
    await db.collection('Specials').updateOne({
        category: `${request.body.category}`,
        type: `${request.body.type}`,
        name: `${request.body.name}`,
        price: `${request.body.price}`,
        sequence: Number(request.body.sequence)
    },{
        $set:{
            timestamp: new Date()
            
        }
    })
    response.redirect(request.get('referer'))
})

app.post('/addWine', async(request,response)=>{
    await db.collection('Specials').insertOne({
        category: `${request.body.category}`,
        grapes: `${request.body.grapes}`,
        name: `${request.body.name}`,
        vintage: `${request.body.vintage}`,
        description: `${request.body.description}`,
        producer: `${request.body.producer}`,
        region: `${request.body.region}`,
        price: Number(request.body.price),
        timestamp: new Date()
    })
    .then(result =>{
        console.log('New Wine Added')
        console.log(request.body)
    })
    response.redirect(request.get('referer'))
})
app.post('/addWineBTG', async(request,response)=>{
    await db.collection('Specials').insertOne({
        category: `${request.body.category}`,
        type: `${request.body.type}`,
        grapes: `${request.body.grapes}`,
        name: `${request.body.name}`,
        vintage: `${request.body.vintage}`,
        description: `${request.body.description}`,
        region: `${request.body.region}`,
        price: Number(request.body.price),
        timestamp: new Date()
    })
    .then(result =>{
        console.log('New Wine BTG Added')
        console.log(request.body)
        console.log(request.url)
    })
    response.redirect(request.get('referer'))
})
app.post('/addLiquor', async(request,response)=>{
    await db.collection('Specials').insertOne({
        category: `${request.body.category}`,
        type: `${request.body.type}`,
        name: `${request.body.name}`,
        price: Number(request.body.price)
    })
    .then(result =>{
        console.log('New Liquor Added')
        console.log(request.body)
    })
    response.redirect(request.get('referer'))
})
app.post('/editWine', async(request,response)=>{
    await db.collection('Specials').updateOne({
            _id: new ObjectId(`${request.body._id}`)
    },{
        $set:{
            category: `${request.body.category}`,
            grapes: `${request.body.grapes}`,
            name: `${request.body.name}`,
            vintage: `${request.body.vintage}`,
            description: `${request.body.description}`,
            producer: `${request.body.producer}`,
            region: `${request.body.region}`,
            price: Number(request.body.price),
            timestamp: new Date()    
        }
    })
    .then(result=>{
        response.redirect(request.get('referer'))
    })
})
app.post('/editWineBTG', async(request,response)=>{
    await db.collection('Specials').updateOne({
            _id: new ObjectId(`${request.body._id}`)
    },{
        $set:{
            category: `${request.body.category}`,
            type: `${request.body.type}`,
            grapes: `${request.body.grapes}`,
            name: `${request.body.name}`,
            vintage: `${request.body.vintage}`,
            description: `${request.body.description}`,
            region: `${request.body.region}`,
            price: Number(request.body.price),
            timestamp: new Date()    
        }
    })
    .then(result=>{
        response.redirect(request.get('referer'))
    })
})
app.post('/editLiquor', async(request,response)=>{
    await db.collection('Specials').updateOne({
            _id: new ObjectId(`${request.body._id}`)
    },{
        $set:{
            category: `${request.body.category}`,
            type: `${request.body.type}`,
            name: `${request.body.name}`,
            price: Number(request.body.price)
        }
    })
    .then(result=>{
        response.redirect(request.get('referer'))
    })
})
app.post('/editAfterDinnerDrink', async(request,response)=>{
    await db.collection('Specials').updateOne({
            _id: new ObjectId(`${request.body._id}`)
    },{
        $set:{
            category: `${request.body.category}`,
            type: `${request.body.type}`,
            sequence: Number(request.body.sequence),
            name: `${request.body.name}`,
            description: `${request.body.description}`,
            price: `${request.body.price}`,
            timestamp: new Date()
        }
    })
    .then(result=>{
        response.redirect(request.get('referer'))
    })
})


app.delete('/deleteSpecial', async (request,response) => {
    let count = 0;
    await db.collection('Specials').find().toArray()
    .then(data=>{
        data.forEach(element=>{
            if(element.category == request.body.category &&
                element.sequence != "0") count++
        })
    })
                for (let i=Number(request.body.sequence)+1;i<=count;i++){
                    await db.collection('Specials').updateOne({
                        category: `${request.body.category}`,
                        // sequence: `${i}`
                        sequence: i
                    },{
                        $set:{
                            // sequence: `${new String(i-1)}`
                            sequence: i-1
                        }
                    })                
                }
               
            
                console.log(request.body);
                console.log(typeof(request.body._id));
                console.log(request.body._id.length);
                    
    db.collection('Specials').deleteOne({_id: new ObjectId(request.body._id)})
    .then(result => {
        console.log('Special Deleted')
        response.json('Special Deleted')
    })
})
app.delete('/deleteWine', async(req, res)=>{
    console.log(req.body);
    console.log(typeof(req.body._id));
    console.log(req.body._id.length);
    await db.collection('Specials').deleteOne({_id: new ObjectId(req.body._id)})
    .then(result=>{
        console.log('Wine Deleted')
        res.json('Wine Deleted')
    })
})
app.delete('/deleteLiquor', (req, res)=>{
    console.log(req.body);
    console.log(req.body._id);
    console.log(typeof(req.body._id));
    console.log(req.body._id.length);
    db.collection('Specials').deleteOne({_id: new ObjectId(req.body._id)})
    .then(result=>{
        console.log('Liquor Deleted')
        res.json('Liquor Deleted')
    })
})
app.delete('/deleteArchive', async(req, res)=>{
    // console.log(req.body);
    await db.collection('Specials').deleteOne({_id: new ObjectId(req.body._id)})
    .then(result=>{
        console.log('Archive Deleted')
        res.json('Archive Deleted')
    })
})




















app.post('/archiveSpecial', async (request,response)=>{
    console.log('archive()');
    let totalCount = 0;
    await db.collection('Specials').find().toArray()
    .then(data =>{
        data.forEach(element => { 
            if (element.category == request.body.category &&
                element.sequence != 0) totalCount++
            
        });
    })
    console.log('sequence: '+request.body.sequence + typeof(request.body.sequence));
console.log('totalCount: '+totalCount);
    for (let i=Number(request.body.sequence)+1;i<=totalCount;i++){
        console.log('request.body.category: '+request.body.category);
        console.log('i: '+i);
        await db.collection('Specials').updateOne({
            category: `${request.body.category}`,
            sequence: i
        },{
            $set:{
                sequence: i-1
            }
        })
    }
    await db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            // sequence: "0",
            sequence: 0,
            timestamp: new Date()
        }
    })
    .then(result => {
        console.log('Special Archived')
        // setTimeout(()=>{response.json('Special Archived')},250)
        response.json('Special Archived')
    })
})

















app.post('/unarchiveSpecial', async (request,response)=>{
    let count=0;
    await db.collection('Specials').find().toArray()
    .then(data=>{
        data.forEach(element=>{
            if (element.category == request.body.category &&
                element.sequence &&
                element.sequence != 0) count++
        })
    })
    // console.log(request);
    db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            sequence: count + 1,
            timestamp: new Date()
        }
    })
    .then(result => {
        console.log('Special UNarchived/Restored')
        response.json('Special UNarchived/Restored')
    })
})





























app.post('/editSpecial', (request, response) => {
    // console.log(request);
    db.collection('Specials').updateOne({_id: new ObjectId(request.body._id)},{
        $set:{
            category: request.body.category,
            sequence: Number(request.body.sequence),
            name: request.body.name,
            description: request.body.description,
            price: request.body.price,
            allergies: request.body.allergies,
            timestamp: new Date()
        }
    })
    .then(result =>{
        console.log('Existing Special Modified')
        response.redirect(request.get('referer'))
    })
})
app.get('/manager', (req,res)=>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data => {
        res.render('manager.ejs', {info: data})
    })
})
app.get('/specialsFormatLayout', (req,res)=>{
    db.collection('Specials').find().sort({sequence:1}).toArray()
    .then(data=>{
        res.render('specialsFormatLayout.ejs', {info: data})
    })
})
app.post('/moveUp', (request,response)=>{
    
    db.collection('Specials').updateOne({
        category: request.body.category,
        sequence: Number(request.body.sequence)-1
    },
    {
        $set:{
            sequence: Number(request.body.sequence)
        }})

    db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            sequence: Number(request.body.sequence) - 1
        }
    })

        
    .then(result =>{
        console.log('Special Moved Up')
        response.json('Special Moved Up')
    })
})
app.post('/moveUpAfterDinnerDrink', (request,response)=>{
    
    db.collection('Specials').updateOne({
        type: request.body.type,
        sequence: Number(request.body.sequence)-1
    },
    {
        $set:{
            sequence: Number(request.body.sequence)
        }})

    db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            sequence: Number(request.body.sequence) - 1
        }
    })

        
    .then(result =>{
        console.log('After Dinner Drink Moved Up')
        response.json('After Dinner Drink Moved Up')
    })
})
app.post('/moveDownAfterDinnerDrink', (request,response)=>{
    
    db.collection('Specials').updateOne({
        type: request.body.type,
        sequence: Number(request.body.sequence)+1
    },
    {
        $set:{
            sequence: Number(request.body.sequence)
        }})

    db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            sequence: Number(request.body.sequence) + 1
        }
    })

        
    .then(result =>{
        console.log('After Dinner Drink Moved Down')
        response.json('After Dinner Drink Moved Down')
    })
})

app.post('/moveDown', (request,response)=>{
    
    db.collection('Specials').updateOne({
        category: request.body.category,
        sequence: Number(request.body.sequence) + 1
    },
    {
        $set:{
            sequence: Number(request.body.sequence)
        }})

    db.collection('Specials').updateOne({
        _id: new ObjectId(request.body._id)
    },{
        $set:{
            sequence: Number(request.body.sequence) + 1
        }
    })

        
    .then(result =>{
        console.log('Special Moved Down')
        response.json('Special Moved Down')
    })
})

app.all('*', (req,res)=>{
    res.send('404 ERROR: File not found')
})