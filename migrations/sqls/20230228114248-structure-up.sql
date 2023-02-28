/* Replace with your SQL commands */
create table user_info (
    id serial,
    firstname varchar(255) not null,
    lastname varchar(255) not null,
    password varchar(255) not null,
    primary key (id)
);
create table products (
    id serial,
    name varchar(255) not null,
    price int not null,
    primary key (id)
);
create table orders (
    id int not null,
    user_id int not null,
    product_id int not null,
    quantity int not null,
    status varchar(255) not null,
    primary key (id, product_id),
    foreign key (user_id) references user_info(id),
    foreign key (product_id) references products(id)
);
