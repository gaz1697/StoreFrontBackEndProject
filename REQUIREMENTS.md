# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users

- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes

#### Product

- id
- name
- price

                                    Table "public.product"

  Column | Type | Collation | Nullable | Default  
  --------+------------------------+-----------+----------+-------------------------------------
  id | integer | | not null | nextval('product_id_seq'::regclass)
  name | character varying(100) | | not null |
  price | numeric(10,2) | | not null |
  Indexes:
  "product_pkey" PRIMARY KEY, btree (id)
  Referenced by:
  TABLE ""Order"" CONSTRAINT "Order_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id)

#### User

- id
- firstName
- lastName
- password

                                       Table "public.user_info"

  Column | Type | Collation | Nullable | Default  
  -----------+------------------------+-----------+----------+---------------------------------------
  id | integer | | not null | nextval('user_info_id_seq'::regclass)
  firstname | character varying(50) | | not null |
  lastname | character varying(50) | | not null |
  password | character varying(255) | | not null |
  Indexes:
  "user_info_pkey" PRIMARY KEY, btree (id)
  Referenced by:
  TABLE ""Order"" CONSTRAINT "Order_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_info(id)

#### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

                                        Table "public.Order"

  Column | Type | Collation | Nullable | Default  
  ------------+-----------------------+-----------+----------+-------------------------------------
  id | integer | | not null | nextval('"Order_id_seq"'::regclass)
  product_id | integer | | not null |
  quantity | integer | | not null |
  user_id | integer | | not null |
  status | character varying(20) | | not null |
  Indexes:
  "Order_pkey" PRIMARY KEY, btree (id)
  Foreign-key constraints:
  "Order_product_id_fkey" FOREIGN KEY (product_id) REFERENCES product(id)
  "Order_user_id_fkey" FOREIGN KEY (user_id) REFERENCES user_info(id)
