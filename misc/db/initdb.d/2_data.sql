INSERT INTO users (username, password_hash, role) VALUES ('Alice', 'passhash1', 'admin');
INSERT INTO users (username, password_hash, score, role) VALUES ('Bob', 'passhash2', 0, 'player');
INSERT INTO users (username, password_hash, role) VALUES ('Conishi', 'passhash3', 'admin');
INSERT INTO users (username, password_hash, score, role) VALUES ('Dvorak', 'passhash4', 0, 'player');
INSERT INTO users (username, password_hash, score, role) VALUES ('Eimy', 'passhash5', 0, 'player');

INSERT INTO challenges (title, description, flag, points) VALUES ('chall 1', 'Easy Challenge!', 'CTF{this_is_flag_1}', 100);
INSERT INTO challenges (title, description, flag, points) VALUES ('chall 2', 'Med Challenge!', 'CTF{this_is_flag_2}', 100);
INSERT INTO challenges (title, description, flag, points) VALUES ('chall 3', 'Hard Challenge!', 'CTF{this_is_flag_3}', 100);
INSERT INTO challenges (title, description, flag, points) VALUES ('chall 4', 'Super Challenge!', 'CTF{this_is_flag_4}', 100);
INSERT INTO challenges (title, description, flag, points) VALUES ('chall 5', 'Hyper Challenge!', 'CTF{this_is_flag_5}', 100);

INSERT INTO submissions (user_id, challenge_id, correctness) VALUES (1,1,false);

INSERT INTO attachments (name, url, challenge_id) VALUES ('chall.zip','https://example.com/chall.zip',1);
