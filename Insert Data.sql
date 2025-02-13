-- Insert data into Role table
INSERT INTO Role (RoleId, RoleName, Status) VALUES
(6FE9AD54-E317-4356-959B-BEDA433D0097, 'Admin', 1),
(22BB4045-38B3-4B15-B523-348ABF832EB8, 'User', 1),
(28A1F3F0-B5E8-4C5F-9DA8-8F61C351C1B4, 'Event Organizer', 1),
(ECEDF9DF-DB0E-46A5-B150-870C634E5DBB, 'Staff', 1);

-- Insert data into User table
INSERT INTO [User] (UserId, FullName, Email, Password, RoleId, Status, CreatedAt) VALUES
(D39BF95E-E6C3-41A6-94B1-DF92AACE83A2, 'Nguyen Van A', 'nguyenvana@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'User'), 1, GETDATE()),
(9D0EB9A4-9810-4B29-B952-515BF39050EC, 'Tran Thi B', 'tranthib@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'Admin'), 1, GETDATE()),
(BC487D14-7503-4451-AFD3-A3FB286F59F0, 'Le Van C', 'levanc@example.com', 'password123', (SELECT RoleId FROM Role WHERE RoleName = 'Event Organizer'), 1, GETDATE());

-- Insert data into Wallet table
INSERT INTO Wallet (WalletId, UserId, Balance) VALUES
(E5B56B75-CB6F-4059-AA6C-59110A940035, (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), 100000),
(94CD3445-2BA0-4741-8172-AFBCEFD73177, (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), 50000),
(D1A3119B-85A6-4D0A-969A-52F8AF3D0EE5, (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), 200000);

-- Insert data into Events table
INSERT INTO Events (EventId, Name, Place, CreatedAt, UserId, TimeStart, TimeEnd, Type, Status) VALUES
(79681739-E09E-4089-AB05-7A1D2C8045C1, 'Music Festival', 'Hanoi', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), '2025-05-01', '2025-05-02', 1, 1),
(64203353-507B-4235-BB40-DD813D8CD860, 'Tech Meetup', 'Ho Chi Minh City', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), '2025-06-10', '2025-06-11', 2, 1),
(10F8EEA1-C2AC-439F-99CC-3B7E2194A518, 'Startup Pitch', 'Da Nang', GETDATE(), (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), '2025-07-15', '2025-07-16', 3, 1);

-- Insert data into Posts table
INSERT INTO Posts (PostId, EventId, UserId, CreatedAt, Title, Content, Type, Status) VALUES
(853D0E79-B3B1-4823-8ED9-6C66B5F36AEF, (SELECT EventId FROM Events WHERE Name = 'Music Festival'), (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), GETDATE(), 'Amazing Event!', 'Join us for a great time!', 1, 1),
(D080E5CA-FF70-4936-9F4C-03AEBF90281B, (SELECT EventId FROM Events WHERE Name = 'Tech Meetup'), (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), GETDATE(), 'Tech Innovations', 'Discussing the latest in AI and ML', 2, 1),
(85DD0F81-0591-48E3-818D-6CB467DD5A2B, (SELECT EventId FROM Events WHERE Name = 'Startup Pitch'), (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), GETDATE(), 'Startup Pitches', 'Exciting ideas and ventures', 3, 1);

-- Insert data into Groups table
INSERT INTO Groups (GroupId, GroupName, CreatedAt, EventId, TotalMember, Leader, Visibility, Status) VALUES
(AC606ACD-2827-455E-9510-65992299CA60, 'Developers Group', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Tech Meetup'), 10, (SELECT UserId FROM [User] WHERE FullName = 'Tran Thi B'), 1, 1),
(8A510F6D-1A9D-4C6A-8885-B1D6A1DF7EFC, 'Music Lovers', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Music Festival'), 15, (SELECT UserId FROM [User] WHERE FullName = 'Nguyen Van A'), 1, 1),
(B7BCABF2-5338-4F07-90C2-7DD42C666B35, 'Startup Enthusiasts', GETDATE(), (SELECT EventId FROM Events WHERE Name = 'Startup Pitch'), 8, (SELECT UserId FROM [User] WHERE FullName = 'Le Van C'), 1, 1);
