import QtQuick
import QtQuick.Controls
import QtQuick.Dialogs

Dialog {
    property string id
    property string footage
    property string roomCount
    property string region
    property string street
    property string houseNumber
    property string floorNumber
    property string houseType
    property string floorCount
    property string price
    property string regionPriority
    property string streetPriority
    property string floorPriority

    standardButtons: Dialog.Cancel | Dialog.Ok
    modal: true
    Column {
        id: layout
        objectName: "layout"
        anchors.fill: parent
        TextField {
            id: idField
            width: parent.width
            placeholderText: qsTr("Номер квартиры")
        }
        TextField {
            id: footageField
            width: parent.width
            placeholderText: qsTr("Метраж квартиры")
        }
        TextField {
            id: roomCountField
            width: parent.width
            placeholderText: qsTr("Количество комнат")
        }
        TextField {
            id: regionField
            width: parent.width
            placeholderText: qsTr("Район")
        }
        TextField {
            id: streetField
            width: parent.width
            placeholderText: qsTr("Улица")
        }
        TextField {
            id: houseNumberField
            width: parent.width
            placeholderText: qsTr("Номер дома")
        }
        TextField {
            id: floorNumberField
            width: parent.width
            placeholderText: qsTr("Этаж")
        }
        TextField {
            id: houseTypeField
            width: parent.width
            placeholderText: qsTr("Тип дома")
        }
        TextField {
            id: floorCountField
            width: parent.width
            placeholderText: qsTr("Количество этажей")
        }
        TextField {
            id: priceField
            width: parent.width
            placeholderText: qsTr("Цена")
        }
        TextField {
            id: regionPriorityField
            width: parent.width
            placeholderText: qsTr("Приоритетный регион")
        }
        TextField {
            id: streetPriorityField
            width: parent.width
            placeholderText: qsTr("Приоритетная улица")
        }
        TextField {
            id: floorPriorityField
            width: parent.width
            placeholderText: qsTr("Приоритетный этаж")
        }
    }
    onAccepted: {
            id = idField.text
            footage = footageField.text
            roomCount = roomCountField.text
            region = regionField.text
            street = streetField.text
            houseNumber = houseNumberField.text
            floorNumber = floorNumberField.text
            houseType = houseTypeField.text
            floorCount = floorCountField.text
            price = priceField.text
            regionPriority = regionPriorityField.text
            streetPriority = streetPriorityField.text
            floorPriority = floorPriorityField.text
        }
}