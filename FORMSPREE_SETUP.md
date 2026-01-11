# Formspree Configuration Guide

## Overview

Conformio uses **Formspree** for handling trial form submissions. Formspree is a serverless email service that doesn't require a backend server.

**Benefits:**
- ✅ No backend needed (serverless)
- ✅ Emails sent directly from frontend
- ✅ Free tier: 50 submissions/month
- ✅ No configuration needed (just get Form ID)
- ✅ GDPR compliant
- ✅ Built-in spam protection

## Setup Instructions

### Step 1: Create Formspree Account

1. Go to [formspree.io](https://formspree.io/)
2. Click "Sign up" or "Get Started"
3. Sign up with email or GitHub account
4. Verify your email

### Step 2: Create a New Form

1. In Formspree dashboard, click "New Form"
2. Enter form name: `Conformio Trial`
3. Choose endpoint name: `conformio-trial` (will auto-generate unique ID)
4. Click "Create"

### Step 3: Get Your Form ID

After creating the form, you'll see:
```
Form ID: xxxxxxxxxxxxxxxx
Endpoint: https://formspree.io/f/xxxxxxxxxxxxxxxx
```

Copy the Form ID (the part after `f/`)

### Step 4: Add to Environment Variables

#### For Local Development

Create `.env.local` in the project root:

```env
VITE_FORMSPREE_ID=xxxxxxxxxxxxxxxx
```

Replace `xxxxxxxxxxxxxxxx` with your actual Form ID from Step 3.

#### For Vercel Production

1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add new variable:
   - **Name:** `VITE_FORMSPREE_ID`
   - **Value:** Your Form ID from Step 3
4. Select which environments: Production, Preview, Development (usually all)
5. Click "Save"
6. Redeploy your project

### Step 5: Customize Email Notifications (Optional)

In Formspree dashboard:

1. Go to your form settings
2. Configure:
   - **Redirect URL:** Where user goes after submission
   - **Email notifications:** Who gets notified about new submissions
   - **Confirmation email:** What user receives after submitting
   - **Custom fields:** Map form fields to email

**Recommended Settings:**

| Setting | Value |
|---------|-------|
| Redirect URL | `https://yoursite.com` (or leave blank) |
| Send me an email for each submission | ✅ Enabled |
| Send submitter a copy | ✅ Enabled |
| Email notifications to | Your email address |

### Step 6: Test the Form

1. Run locally: `npm run dev`
2. Open trial form
3. Fill and submit
4. Check your email for submission

## Troubleshooting

### Issue: "Form submission is not configured"

**Problem:** `VITE_FORMSPREE_ID` environment variable not set

**Solution:**
- Local: Add to `.env.local`
- Production: Add to Vercel environment variables
- Make sure variable name is exactly `VITE_FORMSPREE_ID` (with `VITE_` prefix)

### Issue: Form submits but no email received

**Possible Causes:**

1. **Wrong Form ID:** Verify in Formspree dashboard
2. **Email not verified:** Check Formspree inbox for verification email
3. **Spam folder:** Check email spam/junk folder
4. **Formspree disabled:** Check form is active in Formspree dashboard

**Solution:**
- Test with direct Formspree endpoint in browser console:
  ```javascript
  fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test@example.com', message: 'test' })
  }).then(r => r.json()).then(console.log)
  ```

### Issue: CORS errors in browser console

**Problem:** "Access to XMLHttpRequest blocked by CORS"

**Solution:** This is normal. Formspree handles CORS correctly, but you might see warnings. The form will still submit successfully.

### Issue: Form says "Failed to submit"

**Possible Causes:**

1. **Formspree API down:** Check [formspree status](https://status.formspree.io/)
2. **Network issue:** Try again or check internet connection
3. **Rate limit:** Too many submissions too quickly (Formspree rate limits: 10 req/second)
4. **Invalid data:** Check form fields match expected format

**Solution:**
- Refresh page and try again
- Check browser console for more detailed error message
- Contact Formspree support if issue persists

## Formspree Limits and Pricing

### Free Plan
- 50 submissions/month
- Basic spam filtering
- Email notifications
- Basic analytics

### Pro Plan ($25/month)
- Unlimited submissions
- Advanced spam filtering
- Custom redirects
- Advanced analytics
- API access

For more pricing info, visit: https://formspree.io/pricing

## Data Flow

```
User fills form
    ↓
Clicks "Submit"
    ↓
Frontend sends to Formspree API
    ↓
Formspree receives data
    ↓
✅ Email sent to admin
    ↓
✅ Confirmation email to user
    ↓
✅ User sees success message
```

## Security Notes

- **API Key Exposure:** `VITE_FORMSPREE_ID` is public (intentional - it's just a form ID)
- **No sensitive data:** Don't include passwords or tokens in form
- **HTTPS only:** All submissions encrypted in transit
- **GDPR compliant:** Formspree doesn't store data by default

## Form Fields Sent

The trial form sends these fields to Formspree:

```json
{
  "fullName": "John Doe",
  "email": "john@company.com",
  "companyName": "Company Inc",
  "teamSize": "6-20",
  "objectives": "Loi 25, SOC 2",
  "utmSource": "google",
  "_subject": "New Trial Form Submission - Conformio",
  "_replyto": "john@company.com"
}
```

## Advanced Configuration

### Custom Email Template

Create a custom email template in Formspree dashboard:
```html
<h2>New Trial Submission</h2>
<p><strong>Name:</strong> {{fullName}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Company:</strong> {{companyName}}</p>
<p><strong>Team Size:</strong> {{teamSize}}</p>
<p><strong>Objectives:</strong> {{objectives}}</p>
```

### Webhook Notifications

Formspree Pro supports webhooks to send data to external services:
- Slack notifications
- Discord notifications
- Custom API endpoints
- Database logging

## Migration to Other Services

If you want to switch services later:

### Option 1: SendGrid
- Send 100+ emails/day
- More control over email templates
- Requires backend API endpoint

### Option 2: Mailgun
- Developer-friendly
- Good API
- Requires backend API endpoint

### Option 3: Custom Backend
- Full control
- Can store data
- More complex setup

To migrate, update `src/api/submitTrialForm.ts` to use your chosen service instead of Formspree.

## References

- [Formspree Documentation](https://formspree.io/docs/)
- [Formspree API Reference](https://formspree.io/docs/api/)
- [Formspree Status](https://status.formspree.io/)

## Support

- Formspree Support: https://formspree.io/support
- Email: support@formspree.io
- Twitter: @formspreeio

---

**Next Steps:**
1. ✅ Create Formspree account
2. ✅ Create new form
3. ✅ Copy Form ID
4. ✅ Add to environment variables
5. ✅ Test locally
6. ✅ Deploy to Vercel
7. ✅ Add Form ID to Vercel environment variables
8. ✅ Test in production
