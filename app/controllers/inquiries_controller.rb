class InquiriesController < ApplicationController
  def create
    @inquiry = Inquiry.create(inquiry_params)

    if @inquiry.save
      message = "Email: #{@inquiry.email}\n" +
                "Name: #{@inquiry.name}\n" +
                "Message: #{@inquiry.message}"

      mg_client = Mailgun::Client.new ENV['API_KEY']
      message_params = {:from    => ENV['MG_USERNAME'],
                        :to      => 'jonathanceddy@gmail.com',
                        :subject => 'New CodeGray Inquiry',
                        :text    => message}
      mg_client.send_message ENV['DOMAIN'], message_params
      # ContactMailer.inquiry_email(@inquiry).deliver_now
      redirect_to root_path
    end

  end


  private

  def inquiry_params
    params.require(:inquiry).permit(:email, :name, :message)
  end
end
