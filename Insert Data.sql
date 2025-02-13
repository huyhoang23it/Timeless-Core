-- Insert data into Role table
INSERT INTO Role (RoleId, RoleName, Status) VALUES
(NEWID(), 'Admin', 1),
(NEWID(), 'User', 1),
(NEWID(), 'Event Organizer', 1),
(NEWID(), 'Staff', 1);

-- Insert data into User table
INSERT INTO [User] (UserId, FullName, Email, Password, RoleId, Status, CreatedAt) VALUES
(NEWID(), 'Nguyen Van A', 'nguyenvana@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'User'), 1, GETDATE()),
(NEWID(), 'Tran Thi B', 'tranthib@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'Admin'), 1, GETDATE()),
(NEWID(), 'Le Van C', 'levanc@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'Event Organizer'), 1, GETDATE());

-- Insert data into Wallet table
INSERT INTO Wallet (WalletId, UserId, Balance) VALUES
(NEWID(), (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), 100000),
(NEWID(), (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), 50000),
(NEWID(), (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), 200000);

-- Insert data into Events table
INSERT INTO Events (EventId, Name, Place, CreatedAt, UserId, TimeStart, TimeEnd, Type, Status) VALUES
(NEWID(), 'Music Festival', 'Hanoi', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), '2025-05-01', '2025-05-02', 1, 1),
(NEWID(), 'Tech Meetup', 'Ho Chi Minh City', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), '2025-06-10', '2025-06-11', 2, 1),
(NEWID(), 'Startup Pitch', 'Da Nang', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), '2025-07-15', '2025-07-16', 3, 1);

-- Insert data into Posts table
INSERT INTO Posts (PostId, EventId, UserId, CreatedAt, Title, Content, Type, Status) VALUES
(NEWID(), (SELECT EventId FROM Events WHERE Name = 'Music Festival'), (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), GETDATE(), 'Amazing Event!', 'Join us for a great time!', 1, 1),
(NEWID(), (SELECT EventId FROM Events WHERE Name = 'Tech Meetup'), (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), GETDATE(), 'Tech Innovations', 'Discussing the latest in AI and ML', 2, 1),
(NEWID(), (SELECT EventId FROM Events WHERE Name = 'Startup Pitch'), (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), GETDATE(), 'Startup Pitches', 'Exciting ideas and ventures', 3, 1);

-- Insert data into Groups table
INSERT INTO Groups (GroupId, GroupName, CreatedAt, EventId, TotalMember, Leader, Visibility, Status) VALUES
(NEWID(), 'Developers Group', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Tech Meetup'), 10, (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), 1, 1),
(NEWID(), 'Music Lovers', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Music Festival'), 15, (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), 1, 1),
(NEWID(), 'Startup Enthusiasts', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Startup Pitch'), 8, (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), 1, 1);
