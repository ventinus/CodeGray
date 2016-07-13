ActionMailer::Base.smtp_settings = {
  :port           => 587,
  :address        => "smtp.mailgun.org",
  :domain         => ENV['DOMAIN'],
  :user_name      => ENV['MG_USERNAME'],
  :password       => ENV['MG_PASSWORD'],
  :authentication => :plain,
}
