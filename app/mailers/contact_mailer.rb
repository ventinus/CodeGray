class ContactMailer < ApplicationMailer
  def inquiry_email(inquiry)
    @inquiry = inquiry
    mail(to: ['jonathanceddy@gmail.com'], subject: 'New CodeGray Inquiry')
  end
end
