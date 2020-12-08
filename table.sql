Create Table users (
    id serial primary key,
    user_name text not null
);

Create Table levels (
    id serial primary key,
    level_name int not null
);

Create Table level_Acts (
    id serial primary key,
    question text not null,
     motion text not null,
      video_url text not null,
      level_id int,
     foreign key (level_id) references levels(id)
);

Create Table progress (
    id serial primary key,
    user_id int,
     motion_status text not null,
      level_act_id int,
     foreign key (level_act_id) references levels(id),
       foreign key (user_id) references users(id)
  
);