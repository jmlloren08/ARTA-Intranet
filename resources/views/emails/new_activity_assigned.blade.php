<!DOCTYPE html>
<html>

<head>
    <title>New Activity Assigned</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f3f4f6; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <!-- Logo -->
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/22/Anti-Red_Tape_Authority_Logo.png" alt="ARTA Logo" style="width: 100px; height: auto;">
        </div>

        <h2 style="font-size: 20px; font-weight: bold; color: #111827;">New Activity Created</h2>

        <p style="font-size: 16px; color: #1f2937;">Hi {{ $user->name }},</p>

        <p style="font-size: 16px; color: #1f2937;">A new activity created has been assigned to you:</p>

        <ul style="list-style-type: none; padding: 0;">
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Work Item:</strong> {{ $activity->work_item }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Description:</strong> {{ $activity->description }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Office:</strong> {{ $activity->category }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Complexity:</strong> {{ $activity->complexity }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Start Date:</strong> {{ $activity->start_date }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Due Date:</strong> {{ $activity->due_date }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Key Stakeholders:</strong> {{ $activity->key_stakeholders }}
            </li>
            <li style="font-size: 16px; color: #374151; margin-bottom: 8px;">
                <strong>Created by:</strong> {{ $activity->created_by }}
            </li>
        </ul>
        <!-- Action Button -->
        <div style="text-align: center; margin-top: 20px;">
            <a href="https://arta-intranet.appjsvn.com/" style="background-color: #3b82f6; color: #ffffff; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 16px;">
                Login to View Activity
            </a>
        </div>

        <p style="font-size: 16px; color: #1f2937;">Regards,<br>Operations Team</p>
    </div>
</body>

</html>