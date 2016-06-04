/**
 * Created by eason on 6/2/16.
 */
let Employee = {
    employeeNo:'',
    employeeName:'',
    gender:'',
    birthday:'',
    address:'',
    telephone:'',
    hireDate:'',
    department:'',
    headShip:'',
    salary:''
};

let Product = {
    productNo:'',
    productName:'',
    productClass:'',
    productPrice:'',
    inStock:''
};

let Customer = {
    customerNo:'',
    customerName:'',
    address:'',
    telephone:'',
    zip:''
};

let OrderMaster = {
    orderNo:'',
    customerNo:'',
    employeeNo:'',
    orderDate:'',
    orderSum:'',
    invoiceNo:''
};

let OrderDetail = {
    orderNo:'',
    productNo:'',
    quantity:'',
    price:''
};

let tables = {
    Employee:Employee,
    Product:Product,
    Customer:Customer,
    OrderMaster:OrderMaster,
    OrderDetail:OrderDetail
};

module.exports = {
    tables:tables,
    top:0,
    orderBy:'',
    desc:true
};