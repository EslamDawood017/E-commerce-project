﻿namespace Store.DTOS.User
{
    public class UpdateUserInfo
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string? Password { get; set; }
        public string? role { get; set; }
    }
}
