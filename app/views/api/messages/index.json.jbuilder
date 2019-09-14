json.array! @messages do |message|
  json.content message.content
  json.image message.image_url
  json.date message.created_at.datetime.to_s(:datetime)
  json.user_name message.user.name
  json.id message.id
end