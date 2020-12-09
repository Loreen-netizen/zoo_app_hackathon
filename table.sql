Create Table users (
    id serial primary key,
    user_name text not null
);

Create Table levels (
    level_number int primary key,
    level_name text not null
);

Create Table level_Acts (
    id serial primary key,
     motion text not null,
      video_url text not null,
      level_id int,
     foreign key (level_id) references levels(level_number)
);

Create Table progress (
    id serial primary key,
    user_id int,
     motion_status text not null,
      level_act_id int,
     foreign key (level_act_id) references levels(level_number),
       foreign key (user_id) references users(id)
  
);

INSERT INTO levels (level_number, level_name) values (1,'Polar Bear');

INSERT INTO levels (level_number, level_name) values (2, 'Snake');




 INSERT INTO  level_Acts
 (motion, video_url,level_id) 
 VALUES ('swim', 'https://www.youtube.com/watch?v=goGXfSHoGvk', 1);

 INSERT INTO  level_Acts
 (motion, video_url,level_id) 
 VALUES ('slither', 'https://www.youtube.com/watch?v=h5YhclqjW48', 2);

 INSERT INTO  level_Acts (motion, video_url,level_id) 
 VALUES ('nothing', '', null);