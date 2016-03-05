class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  belongs_to :plan
  attr_accessor :stripe_card_token

  def save_with_payment
    if valid?
      # use stripe gem to send info to stripe server.
      # stripe will return back a customer id.
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      # set property of user equal to id stripe returns back
      self.stripe_customer_token = customer.id
      # save user
      save!
    end
  end
end
