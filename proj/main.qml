import QtQuick 
import QtQuick.Window
import QtQuick.Controls 
import QtQuick.LocalStorage
import QtQuick.Layouts 
import Qt.labs.qmlmodels
import "Database.js" as JS

Window {
    id: window
    visible: true
    width: 1850
    height:  900
    title: qsTr("Квартирный Вопрос")


        ListView {
            id: listView
            visible: true
            x: 0
            anchors.top: buttonAdd.bottom
            width: parent.width
            height: parent.height - buttonAdd.height
            model: ListModel { id: flatModel }
            delegate: Label {
                height: 40
                id: kvText
                text: "Номер квартиры: " + id + " "
                + "Метраж: " + footage + " "
                + "Количество комнат: " + roomCount + " "
                + "Район: " + region + " "
                + "Улица: " + street + " "
                + "Номер дома: " + houseNumber + " "
                + "Этаж: " + floorNumber + " "
                + "Тип: " + houseType + " "
                + "Кол-во этажей: " + floorCount + " "
                + "Цена: " + price + "р "
                + "Приоритет района: " + regionPriority + " "
                + "Приоритет улицы: " + streetPriority + " "
                + "Приоритет этажа: " + floorPriority + " "
                Button {
                    text: ("Удалить")
                    anchors.left: parent.right
                    id: deleteButton
                    onClicked: {
                        JS.dbDelete(id)
                        flatModel.clear()
                        JS.dbReadAll()
                    }
                }
                
                Button {
                    text: ("Обменять")
                    anchors.left: deleteButton.right
                    onClicked: {
                        var prReg = region
                        var prStr = street
                        var prFl = floorNumber
                        var tempPrice = price
                        flatModel.clear()
                        JS.dbReadAllTradeable(prReg, prStr, prFl)
                        listView.visible = false
                        listViewTrade.visible = true
                        myItem.tempPrice = tempPrice
                    }
                }
            }
        }

        ListView {
            id: listViewTrade
            visible: false
            x: 0
            anchors.top: buttonAdd.bottom
            width: parent.width
            height: parent.height - buttonAdd.height
            model: flatModel
            delegate: Label {
                height: 40
                id: kvText
                text: "Номер квартиры: " + id + " "
                + "Метраж: " + footage + " "
                + "Количество комнат: " + roomCount + " "
                + "Район: " + region + " "
                + "Улица: " + street + " "
                + "Номер дома: " + houseNumber + " "
                + "Этаж: " + floorNumber + " "
                + "Тип: " + houseType + " "
                + "Кол-во этажей: " + floorCount + " "
                + "Цена: " + price + "р "
                + "Приоритет района: " + regionPriority + " "
                + "Приоритет улицы: " + streetPriority + " "
                + "Приоритет этажа: " + floorPriority + " "
                + "Доплата: " + (price-myItem.tempPrice)+"р "
                
                Button { 
                    text: ("Выбрать")
                    anchors.left: parent.right
                    onClicked: {
                        
                        var textToWrite = "Hello, World!";
                        var fileName = "noted_flats.txt";

                        saveTextToFile(textToWrite, fileName);
                    }
                }
            }
        }


    Button {
            id: buttonAdd
            text: qsTr("Добавить")
            anchors.horizontalCenter: parent.horizontalCenter
            onClicked: {
                var component = Qt.createComponent("add.qml");
                var addDialog = component.createObject(window, {x: 1600, y: 300});
                addDialog.open()
                addDialog.accepted.connect(function() {
                    JS.dbInsert(
                        addDialog.id, 
                        addDialog.footage, 
                        addDialog.roomCount, 
                        addDialog.region, 
                        addDialog.street, 
                        addDialog.houseNumber,
                        addDialog.floorNumber,
                        addDialog.houseType,
                        addDialog.floorCount,
                        addDialog.price,
                        addDialog.regionPriority,
                        addDialog.streetPriority,
                        addDialog.floorPriority)
                    flatModel.clear()
                    JS.dbReadAll()
                    addDialog.destroy()
                });
            }
        }


Item{
    id: myItem
    property int tempPrice: 0
}

ComboBox { 
    id: sortBox
    model: ["Отобрать по району", "Отобрать по количеству комнат", "Отобрать по диапазону стоимости"] 
    anchors.horizontalCenter: parent.horizontalLeft
    onActivated: {
       if (sortBox.currentIndex == 0) {
            searchArea.visible = true
            searchAreaOt.visible = false
            searchAreaDo.visible = false
            } 
            if (sortBox.currentIndex == 1) {
            searchArea.visible = true
            searchAreaOt.visible = false
            searchAreaDo.visible = false
            } 
            if (sortBox.currentIndex == 2) {
            searchArea.visible = false
            searchAreaOt.visible = true
            searchAreaDo.visible = true
            } 
    }
}
TextField{
    id: searchArea
    anchors.left: sortBox.right
    visible:true        
    }
TextField{
    id: searchAreaOt
    anchors.left: sortBox.right
    visible:false
    placeholderText: "ot"        
    }

TextField{
    id: searchAreaDo
    anchors.left: searchAreaOt.right
    visible:false 
    placeholderText: "do"         
    }


Button{
    id: fiterBtn
    text: "Найти"
    anchors.left: searchAreaDo.right
    onClicked:{
        if (sortBox.currentIndex == 0) {
            flatModel.clear()
            if(searchArea.text!="")JS.dbReadAllSortRegion(searchArea.text)
            else JS.dbReadAllCustomSort("region")
            }
        if (sortBox.currentIndex == 1) {
            flatModel.clear()
            if(searchArea.text!="")JS.dbReadAllSortRoomCount(searchArea.text)
            else JS.dbReadAllCustomSort("roomCount")
            }
        if (sortBox.currentIndex == 2) {
            flatModel.clear()
            JS.dbReadAllSortPriceFromTo(searchAreaOt.text, searchAreaDo.text)
            }
    }
}
Button{
    id: showAllBtn
    text: "Показать все"
    anchors.left: fiterBtn.right
    onClicked:{
        flatModel.clear()
        JS.dbReadAll()
        listView.visible = true
        listViewTrade.visible = false
    }
}

        Component.onCompleted: {
            JS.dbInit()
            JS.dbReadAll()
        }
    }



