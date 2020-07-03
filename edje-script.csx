using System;
using System.Threading.Tasks;
using PayterPay;

public class Startup
{
    public async Task<object> Invoke(dynamic input)
    {   
        int amount = (int)input.amount;
        int timeout = (int)input.timeout;
        return PayterPay.Main.connectTerminal(amount, timeout);
    }
}