class InquiriesController < ApplicationController

  def create
    @inquiry = Inquiry.create(inquiry_params)
    if @inquiry.save
      ContactMailer.inquiry_email(@inquiry).deliver_now
      redirect_to root_path
    end
  end

  private

  def inquiry_params
    params.require(:inquiry).permit(:email, :name, :message)
  end
end
