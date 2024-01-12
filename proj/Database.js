function dbInit()
{
    var db = LocalStorage.openDatabaseSync("Note_DB", "", "Notes", 1000000)
    try {
        /*db.transaction(function (tx) {
            tx.executeSql('delete FROM note_table WHERE 1=1')
        })*/
        db.transaction(function (tx) {
            //tx.executeSql('DROP TABLE flat_table')
            tx.executeSql('CREATE TABLE IF NOT EXISTS flat_table (id text unique, footage text, roomCount text, region text, street text, houseNumber text, floorNumber text, houseType text, floorCount text, price int, regionPriority text, streetPriority text, floorPriority text)')
        })
    } catch (err) {
        console.log("Error creating table in database: " + err)
    };
}

function dbGetHandle()
{
    try {
        var db = LocalStorage.openDatabaseSync("Note_DB", "",
                                               "Notes", 1000000)
    } catch (err) {
        console.log("Error opening database: " + err)
    }
    return db
}

function dbInsert(id, footage, roomCount, region, street, houseNumber, floorNumber, houseType, floorCount, price, regionPriority, streetPriority, floorPriority)
{
    var db = dbGetHandle()
    var rowid = 0;
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO flat_table VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                      [id, footage, roomCount, region, street, houseNumber, floorNumber, houseType, floorCount, price, regionPriority, streetPriority, floorPriority])
        var result = tx.executeSql('SELECT last_insert_rowid()')
        rowid = result.insertId
    })
    return rowid;
}

function dbDelete(id)
{
    var db = dbGetHandle()
    var rowid = 0;
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM flat_table WHERE id=?',
                      [id])
        var result = tx.executeSql('SELECT last_insert_rowid()')
        rowid = result.insertId
    })
    console.log(id);
    return rowid;
}

function dbReadAll()
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table order by rowid')
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
}

function dbReadAllCustomSort(column)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table ORDER BY '+column)
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
}


function dbReadAllSortStreet()
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table order by street')
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
    
}

function dbReadAllSortRegion(region)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table WHERE region = ? order by region', [region])
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
    
}

function dbReadAllSortRoomCount(roomCount)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table WHERE roomCount = ?', [roomCount])
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
    
}

function dbReadAllSortPriceFromTo(from, to)
{
    var db = dbGetHandle()
    db.transaction(function (tx) {
        var results = tx.executeSql(
                    'SELECT * FROM flat_table WHERE price >= ? AND price <= ?', [from, to])
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
    
}

function noteFlat(id){
    var db = dbGetHandle()
    db.transaction(function (tx) {
    var db = dbGetHandle()
    var rowid = 0;
    var result = tx.executeSql(
        'SELECT * FROM flat_table WHERE id = ?',[id])
    const fs = require('fs');

const filePath = 'noted_flats.txt';
fs.writeFile(filePath, result, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Data written to', filePath);
    }
});
/*
    db.transaction(function (tx) {
        tx.executeSql('DELETE FROM flat_table WHERE id=?',
                      [id])
        var result = tx.executeSql('SELECT last_insert_rowid()')
        rowid = result.insertId
    })
return rowid;*/})
}

function dbReadAllTradeable(regionPriority, streetPriority, floorPriority)
{
    var db = dbGetHandle()
    db.transaction(function (tx) { 
        //var results = tx.executeSql('SELECT * FROM flat_table WHERE regionPriority = '+regionPriority+' AND streetPriority = '+streetPriority+' AND floorPriority = '+floorPriority)
        //var results = tx.executeSql('SELECT * FROM flat_table WHERE regionPriority = ? AND streetPriority = ? AND floorPriority = ?',[regionPriority, streetPriority, floorPriority])
        var results = tx.executeSql('SELECT * FROM flat_table WHERE regionPriority = ? AND streetPriority = ? AND floorPriority = ?', [regionPriority, streetPriority, floorPriority])
        for (var i = 0; i < results.rows.length; i++) {
            flatModel.append({
                                 id: results.rows.item(i).id,
                                 footage: results.rows.item(i).footage,
                                 roomCount: results.rows.item(i).roomCount, 
                                 region: results.rows.item(i).region, 
                                 street: results.rows.item(i).street, 
                                 houseNumber: results.rows.item(i).houseNumber,  
                                 floorNumber: results.rows.item(i).floorNumber, 
                                 houseType: results.rows.item(i).houseType, 
                                 floorCount: results.rows.item(i).floorCount, 
                                 price: results.rows.item(i).price, 
                                 regionPriority: results.rows.item(i).regionPriority, 
                                 streetPriority: results.rows.item(i).streetPriority, 
                                 floorPriority: results.rows.item(i).floorPriority, 
                             })
        }
    })
}
