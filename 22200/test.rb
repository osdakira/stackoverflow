require 'mail'

Mail.defaults do
  retriever_method :pop3, {
    :address => "pop.gmail.com",
    :port => 995,
    :user_name => ''
    :password => '',
    :enable_ssl => true
  }
end

mail = Mail.find(count: 1, order: :desc, what: :all)
# mail.parts[0].body.decoded.encode("UTF-8", "ISO-2022-JP")
mail.parts.first.decoded
