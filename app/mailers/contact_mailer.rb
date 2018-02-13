class ContactMailer < ApplicationMailer

  def inquiry_email(inquiry)
    @inquiry = inquiry
    mail(to: ['jonathanceddy@gmail.com', 'jgray@codegray.co'],
        from: 'no-reply@codegray.co',
        subject: 'New CodeGray Inquiry')
  end
end
