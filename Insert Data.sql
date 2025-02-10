-- Insert data into Role table
INSERT INTO Role (RoleId, RoleName, Status) VALUES
(1, 'Admin', 1),
(2, 'User', 1),
(3, 'Moderator', 1);

-- Insert data into User table
INSERT INTO User (UserId, FullName, Email, Password, RoleId, Status, CreatedAt) VALUES
(1, 'Nguyen Van A', 'nguyenvana@example.com', 'password123', 2, 1, NOW()),
(2, 'Tran Thi B', 'tranthib@example.com', 'password123', 1, 1, NOW()),
(3, 'Le Van C', 'levanc@example.com', 'password123', 3, 1, NOW());

-- Insert data into Wallet table
INSERT INTO Wallet (WalletId, UserId, Balance) VALUES
(1, 1, 100000),
(2, 2, 50000),
(3, 3, 200000);

-- Insert data into Events table
INSERT INTO Events (EventId, Name, Place, CreatedAt, UserId, TimeStart, TimeEnd, Type, Status) VALUES
(1, 'Music Festival', 'Hanoi', NOW(), 1, '2025-05-01', '2025-05-02', 1, 1),
(2, 'Tech Meetup', 'Ho Chi Minh City', NOW(), 2, '2025-06-10', '2025-06-11', 2, 1),
(3, 'Startup Pitch', 'Da Nang', NOW(), 3, '2025-07-15', '2025-07-16', 3, 1);

-- Insert data into Posts table
INSERT INTO Posts (PostId, EventId, UserId, CreatedAt, Title, Content, Type, Status) VALUES
(1, 1, 1, NOW(), 'Amazing Event!', 'Join us for a great time!', 1, 1),
(2, 2, 2, NOW(), 'Tech Innovations', 'Discussing the latest in AI and ML', 2, 1),
(3, 3, 3, NOW(), 'Startup Pitches', 'Exciting ideas and ventures', 3, 1);

-- Insert data into Orders table
INSERT INTO Orders (OrderId, TotalPrice, CreatedAt, UserId, Address, PhoneNumber, TimeEnd, ItemId, Status) VALUES
(1, 30000, NOW(), 1, '123 Main St', '0123456789', NULL, 1, 1),
(2, 45000, NOW(), 2, '456 Second St', '0987654321', NULL, 2, 1),
(3, 60000, NOW(), 3, '789 Third St', '0111222333', NULL, 3, 1);

-- Insert data into Groups table
INSERT INTO Groups (GroupId, GroupName, CreatedAt, EventId, TotalMember, Leader, Visibility, Status) VALUES
(1, 'Developers Group', NOW(), 2, 10, 2, 1, 1),
(2, 'Music Lovers', NOW(), 1, 15, 1, 1, 1),
(3, 'Startup Enthusiasts', NOW(), 3, 8, 3, 1, 1);

-- Insert data into missing tables
INSERT INTO Comments (CommentId, PostId, UserId, Content, CreatedAt) VALUES
(1, 1, 2, 'Great event!', NOW()),
(2, 2, 3, 'Very insightful!', NOW());